import { type DynamoDBRecord } from "aws-lambda";
import { type CheckoutModel, type OrderModel, type OrderItemModel } from "./../../../../types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchGetCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { env } from "$amplify/env/insertStreamHandler";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

// === Main entry ===
export async function processRecord(record: DynamoDBRecord) {
  if (!isInsertEvent(record)) return;

  const checkout = record.dynamodb!.NewImage!;
  const payload = parsePayload(checkout.payload.S);

  validatePayload(payload);

  const menuItems = await fetchMenuItems(
    payload.menuItems.map((item) => item.id),
  );
  validateMenuItemsExist(payload.menuItems, menuItems);

  const orderId = checkout.id.S!;
  const owner = checkout.owner.S!;
  const now = new Date().toISOString();

  const orderItems: OrderItemModel[] = payload.menuItems.map((item) => {
    const menuItem = menuItems.get(item.id)!;
    // check quantity
    const quantity = item.quantity > 0 ? item.quantity : 1;
    const totalPrice = menuItem.price * quantity;

    return {
      id: `${orderId}::${item.id}`,
      orderId,
      owner,
      createdAt: now,
      updatedAt: now,
      quantity,
      totalPrice,
      menuItem: {
        id: menuItem.id,
        title: menuItem.name,
        price: menuItem.price,
      },
    };
  });

  const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const order: OrderModel = {
    id: orderId,
    owner,
    createdAt: now,
    updatedAt: now,
    status: "PENDING",
    totalPrice,
    paymentId: payload.paymentMethod,
  };

  await writeOrderData(order, orderItems);
}

// === Helpers ===

function isInsertEvent(record: DynamoDBRecord): boolean {
  return record.eventName === "INSERT" && !!record.dynamodb?.NewImage;
}

function parsePayload(payloadStr?: string): CheckoutModel["payload"] {
  try {
    return JSON.parse(payloadStr || "{}");
  } catch {
    throw new Error("Failed to parse payload");
  }
}

function validatePayload(payload: CheckoutModel["payload"]): void {
  if (!payload.menuItems?.length || !payload.paymentMethod) {
    throw new Error("Invalid checkout payload");
  }
}

async function fetchMenuItems(ids: string[]): Promise<Map<string, MenuItem>> {
  const response = await docClient.send(
    new BatchGetCommand({
      RequestItems: {
        [env.MENU_ITEM_TABLE_NAME]: {
          Keys: ids.map((id) => ({ id })),
        },
      },
    }),
  );

  const items = response.Responses?.[env.MENU_ITEM_TABLE_NAME] || [];
  return new Map(items.map((item) => [item.id, item as MenuItem]));
}

function validateMenuItemsExist(
  orderedItems: { id: string }[],
  menuItemsMap: Map<string, MenuItem>,
): void {
  const missingItems = orderedItems.filter(
    (item) => !menuItemsMap.has(item.id),
  );
  if (missingItems.length) {
    throw new Error(
      `Menu items not found: ${missingItems.map((i) => i.id).join(", ")}`,
    );
  }
}

async function writeOrderData(order: OrderModel, items: OrderItemModel[]) {
  await docClient.send(
    new BatchWriteCommand({
      RequestItems: {
        [env.ORDER_TABLE_NAME]: [
          {
            PutRequest: {
              Item: order,
            },
          },
        ],
        [env.ORDER_ITEM_TABLE_NAME]: items.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    }),
  );
}
