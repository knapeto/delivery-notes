module.exports = {
  client: {
    includes: ["./app/src/**/*"],
    service: {
      name: "delivery-notes-api",
      localSchemaFile: "./api/generated-schema.graphql",
    },
  },
};
