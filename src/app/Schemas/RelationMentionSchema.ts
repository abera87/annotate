export const RelationMentionSchema = {
    type: "object",
    properties: {
        Arg1Text: { type: "string" },
        Arg2Text: { type: "string" },
        RelationNames: { type: "array", items: { type: "string" } }
    },
    required: ["Arg1Text", "Arg2Text", "RelationNames"]
}