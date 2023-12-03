module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    directory: {
      type: "boolean",
    }
  },
  required: ["name", "boolean"],
  additionalProperties: false,
};