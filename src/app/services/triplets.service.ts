import { Injectable } from '@angular/core';
import { RelationMention } from '../Entities/RelationMention';
import { Triplet } from '../Entities/Triplet';

@Injectable({
  providedIn: 'root'
})
export class TripletsService {
  private tripletData: Triplet[];
  private relations: { Id: number, Text: string }[];
  private entityPairs!: RelationMention[];
  hasEntityPair: boolean;
  constructor() {
    this.ClearAllData();
  }

  GetTripletsData() {
    return this.tripletData;
  }
  GetRelationsData() {
    return this.relations;
  }
  ClearAllData() {
    this.tripletData = [];
    this.relations = [];
    this.entityPairs = [];
    this.hasEntityPair = false;
  }
  CreateEntityPair(): void {
    for (let h = 0; h < this.tripletData.length; h++) {
      let currentItem = this.tripletData[h];
      this.entityPairs = [];
      if (currentItem.EntityMentions !== undefined)
        for (let i = 0; i < currentItem.EntityMentions.length; i++)
          for (let j = 0; j < currentItem.EntityMentions.length; j++) {
            if (i == j)
              continue;
            let entityPair = new RelationMention();
            entityPair.Arg1Text = currentItem.EntityMentions[i];
            entityPair.Arg2Text = currentItem.EntityMentions[j];
            this.entityPairs.push(entityPair);
          }
      this.tripletData[h].RelationMentions = [...this.entityPairs];
      this.hasEntityPair = this.hasEntityPair || this.entityPairs.length > 0;
    }
  }
}
