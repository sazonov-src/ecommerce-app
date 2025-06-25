import {
  type DynamoDBStreamEvent,
  type DynamoDBStreamHandler,
  type DynamoDBRecord,
} from "aws-lambda";
import { processRecord } from "./services/insert/checkout";

// import { env } from "$amplify/env/insertStreamHandler";
//
// const { resourceConfig, libraryOptions } =
//   await getAmplifyDataClientConfig(env);
// Amplify.configure(resourceConfig, libraryOptions);
//
export const handler: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent,
) => {
  for (const record of event.Records) {
    try {
      console.log("Event record:", record.eventName);
      switch (record.eventName) {
        case "INSERT":
          await handleInsert(record);
          break;

        case "MODIFY":
          await handleModify(record);
          break;

        case "REMOVE":
          await handleRemove(record);
          break;

        default:
          console.warn(`⚠️ Unknown event type: ${record.eventName}`);
      }
    } catch (error) {
      console.error("❌ Error processing record:", {
        eventName: record.eventName,
        error,
      });
    }
  }
};

async function handleInsert(record: DynamoDBRecord) {
  const newItem = record.dynamodb?.NewImage;
  const tableName = record.eventSourceARN?.split("/")[1].split("-")[0]; // приклад: arn:aws:dynamodb:...:table/TableName/...
  console.log("tableName", tableName);

  switch (tableName) {
    case "Checkout":
      console.log("📦 New checkout created:", newItem);
      await processRecord(record);
      break;

    default:
      console.warn(`⚠️ Unhandled INSERT for table: ${tableName}`);
  }
}

async function handleModify(record: DynamoDBRecord) {
  const oldItem = record.dynamodb?.OldImage;
  const newItem = record.dynamodb?.NewImage;
  const tableName = record.eventSourceARN?.split("/")[1].split("-")[0];

  if (!oldItem || !newItem) {
    console.warn(
      `⚠️ Missing OldImage or NewImage in MODIFY record for table ${tableName}, skipping modifyOrder call.`,
    );
    return;
  }

  switch (tableName) {
    case "Order":
      console.log("🔧 Order updated:", { from: oldItem, to: newItem });
      // await modifyOrder(oldItem, newItem);
      break;

    case "Users":
      console.log("🔧 User updated:", { from: oldItem, to: newItem });
      // await syncUserProfile(newItem);
      break;

    default:
      console.warn(`⚠️ Unhandled MODIFY for table: ${tableName}`);
  }
}

async function handleRemove(record: DynamoDBRecord) {
  const oldItem = record.dynamodb?.OldImage;
  const tableName = record.eventSourceARN?.split("/")[1].split("-")[0]; // приклад: arn:aws:dynamodb:...:table/TableName/...

  switch (tableName) {
    case "Orders":
      console.log("🗑️ Order deleted:", oldItem);
      // await archiveDeletedOrder(oldItem);
      break;

    case "Users":
      console.log("🗑️ User deleted:", oldItem);
      // await revokeUserAccess(oldItem);
      break;

    default:
      console.warn(`⚠️ Unhandled REMOVE for table: ${tableName}`);
  }
}
