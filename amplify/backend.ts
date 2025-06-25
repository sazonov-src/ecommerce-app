import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { insertStreamHandler } from "./functions/insertStreamHandler/resource";
import { Stack } from "aws-cdk-lib";
import { Policy, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { StartingPosition, EventSourceMapping } from "aws-cdk-lib/aws-lambda";

const backend = defineBackend({
  auth,
  data,
  insertStreamHandler,
});

// Автоматично передаємо ім'я таблиці
const menuItemTableName = backend?.data?.resources?.tables?.MenuItem?.tableName;
if (!menuItemTableName) {
  throw new Error("MenuItem tableName is not defined");
}
backend.insertStreamHandler.addEnvironment(
  "MENU_ITEM_TABLE_NAME",
  menuItemTableName,
);
const orderTableName = backend?.data?.resources?.tables?.Order?.tableName;
if (!orderTableName) {
  throw new Error("Order tableName is not defined");
}
backend.insertStreamHandler.addEnvironment(
  "ORDER_TABLE_NAME",
  orderTableName,
);
backend.insertStreamHandler.addEnvironment(
  "ORDER_ITEM_TABLE_NAME",
  backend?.data?.resources?.tables?.OrderItem?.tableName,
);

// Отримання таблиць
const checkoutTable = backend.data.resources.tables.Checkout;
const menuItemTable = backend.data.resources.tables.MenuItem;
const order = backend.data.resources.tables.Order;
const orderItemTable = backend.data.resources.tables.OrderItem;

const stack = Stack.of(checkoutTable);

// Створення політики з конкретними ARN-и таблиць
const policy = new Policy(stack, "InsertFunctionDynamoDBPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "dynamodb:DescribeStream",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:ListStreams",
      ],
      resources: [
        checkoutTable.tableStreamArn!, // важливо: стрім має бути увімкнений
      ],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:*"],
      resources: [
        checkoutTable.tableArn,
        menuItemTable.tableArn,
        order.tableArn,
        orderItemTable.tableArn,
      ],
    }),
  ],
});

// Прив'язка політики до Lambda
backend.insertStreamHandler.resources.lambda.role?.attachInlinePolicy(policy);

// Прив'язка стріму до Lambda-функції
const insertMapping = new EventSourceMapping(
  stack,
  "InsertFunctionDynamoDBStreamMapping",
  {
    target: backend.insertStreamHandler.resources.lambda,
    eventSourceArn: checkoutTable.tableStreamArn,
    startingPosition: StartingPosition.LATEST,
  },
);

// Вказати залежності
insertMapping.node.addDependency(policy);
insertMapping.node.addDependency(checkoutTable);
