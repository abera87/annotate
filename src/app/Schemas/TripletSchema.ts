import { RelationMentionSchema } from "./RelationMentionSchema";

export const TripletSchema = {
    type: "object",
    properties: {
        SentId: { type: "integer" },
        SentText: { type: "string" },
        EntityMentions: { type: "array", items: { type: "string" } },
        RelationMentions: { type: "array", items: RelationMentionSchema }
    },
    required: ["SentId", "SentText", "EntityMentions", "RelationMentions"]
}