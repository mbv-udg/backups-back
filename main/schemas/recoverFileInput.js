module.exports = {
  type: "object",
  properties: {
    backup: {
      type: "string",
      pattern: '^\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}'
    },
    dir: {
      type: "string",
      default: "."
    },
    file: {
      type: "string",
      default: "."
    }
  },
  required: ["backup"],
  additionalProperties: false,
};