import { TripletSchema } from "./TripletSchema";

export const TripletsWithRelationsSchema = {
  type: "object",
  properties: {
    Relations: { type: "array", items: { type: "string" } },
    Annotate: { type: "array", items: TripletSchema }
  },
  required: ["Relations", "Annotate"],
  additionalProperties: false,
}