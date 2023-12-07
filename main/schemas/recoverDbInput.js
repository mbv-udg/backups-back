module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: '^db_\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}'
    }
  },
  required: ["name"],
  additionalProperties: false,
};