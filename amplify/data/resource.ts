import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Category: a
    .model({
      name: a.string().required(),
      menuItems: a.hasMany("MenuItem", "categoryId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.group("Admin").to(["create", "update", "delete"]),
    ]),

  MenuItem: a
    .model({
      name: a.string().required(),
      price: a.integer().required(),
      categoryId: a.string(),
      category: a.belongsTo("Category", "categoryId"),
      imageUrl: a.url().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.group("Admin").to(["create", "update", "delete"]),
    ]),

  OrderItem: a
    .model({
      orderId: a.string(),
      order: a.belongsTo("Order", "orderId"),
      menuItem: a.customType({
        id: a.string().required(),
        title: a.string(),
        price: a.integer(),
      }),
      quantity: a.integer(),
      totalPrice: a.integer(),
    })
    .authorization((allow) => [allow.owner().to(["read"])]),

  Order: a
    .model({
      menuItems: a.hasMany("OrderItem", "orderId"),
      paymentId: a.string(),
      totalPrice: a.integer().required(),
      status: a.string().required(),
    })
    .authorization((allow) => [allow.owner().to(["read"])]),

  Checkout: a
    .model({
      payload: a.string(),
    })
    .authorization((allow) => [allow.owner().to(["read", "create"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  logging: true,
});
