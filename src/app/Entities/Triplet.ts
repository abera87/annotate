import { EntityMention } from "./EntityMention";
import { RelationMention } from "./RelationMention";

export class Triplet {
    SentId: number;
    SentText: string;
    EntityMentions: EntityMention[];
    RelationMentions: RelationMention[];
    /**
     *
     */
    constructor(sentId:number,sentText:string) {
        this.SentId=sentId;
        this.SentText=sentText;
        
    }
}