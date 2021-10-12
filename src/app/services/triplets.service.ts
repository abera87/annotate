import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RelationMention } from '../Entities/RelationMention';
import { Triplet } from '../Entities/Triplet';

@Injectable({
  providedIn: 'root'
})
export class TripletsService {
  private dataKey: string = "DataTriplets";
  private relationKey: string = "DataRelations";
  private expireKey: string = "DataExpire";
  private tripletData: Triplet[];
  private relations: { Id: number, Text: string }[];
  private entityPairs!: RelationMention[];
  hasEntityPair: boolean;

  isUploadedTripletsWithRelationsData$: Subject<boolean> = new Subject<boolean>();


  constructor() {
    this.tripletData = [];
    this.entityPairs = [];
    this.relations = [];
  }

  GetTripletsData() {
    return this.tripletData;
  }
  GetRelationsData() {
    return this.relations;
  }
  ClearAllData() {
    this.tripletData.splice(0, this.tripletData.length);
    this.entityPairs.splice(0, this.entityPairs.length);
    this.hasEntityPair = false;
  }
  ClearRelationData() {
    this.relations.splice(0, this.relations.length);
    this.tripletData.forEach(element => {
      if (element.RelationMentions !== undefined)
        element.RelationMentions.splice(0, element.RelationMentions.length);
    });
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
            entityPair.Arg1Text = currentItem.EntityMentions[i].trim();
            entityPair.Arg2Text = currentItem.EntityMentions[j].trim();
            this.entityPairs.push(entityPair);
          }
      this.tripletData[h].RelationMentions = [...this.entityPairs];
    }
  }


  CreateEntityPairByIndex(index: number): void {
    let currentItem = this.tripletData[index];
    this.entityPairs = [];
    if (currentItem.EntityMentions !== undefined)
      for (let i = 0; i < currentItem.EntityMentions.length; i++)
        for (let j = 0; j < currentItem.EntityMentions.length; j++) {
          if (i == j)
            continue;
          let entityPair = new RelationMention();
          entityPair.Arg1Text = currentItem.EntityMentions[i].trim();
          entityPair.Arg2Text = currentItem.EntityMentions[j].trim();
          this.entityPairs.push(entityPair);
        }
    this.tripletData[index].RelationMentions = [...this.entityPairs];
  }


  GetTripletsDataForOutput(): Triplet[] {
    let entitiesWithSentencesObjectOutput: Triplet[] = [];
    this.tripletData.forEach((item, index) => {
      let triplet: Triplet;
      triplet = new Triplet(item.SentId, item.SentText);
      if (item.EntityMentions === undefined)
        triplet.EntityMentions = [];
      else
        triplet.EntityMentions = [...item.EntityMentions];
      if (item.RelationMentions === undefined)
        triplet.RelationMentions = [];
      else {
        let relationNames = item.RelationMentions.filter(x => (x.RelationNames !== undefined && x.RelationNames.length > 0));
        triplet.RelationMentions = [...relationNames];
      }

      entitiesWithSentencesObjectOutput.push(triplet);
    });

    return entitiesWithSentencesObjectOutput;
  }

  GetTripletsDataForOutputWithRelations() {
    let tripletsWithRelations = {
      Relations: this.relations.map(x => x.Text),
      Annotate: this.GetTripletsDataForOutput()
    }

    return tripletsWithRelations;
  }

  SetUploadedTripletsWithRelationsData(data: { Relations: string[], Annotate: Triplet[] }) {
    //let tripletsWithRelations=JSON.parse(data);
    data.Relations.forEach((relation, index) => this.relations.push({ Id: index, Text: relation }));
    this.tripletData = [...data.Annotate];
    this.isUploadedTripletsWithRelationsData$.next(true);
  }


  SaveToLocalStorage() {
    localStorage.setItem(this.dataKey, JSON.stringify(this.tripletData));
    localStorage.setItem(this.relationKey, JSON.stringify(this.relations));
    localStorage.setItem("hasEntityPair", JSON.stringify(this.hasEntityPair));
    localStorage.setItem(this.expireKey, JSON.stringify(this.GetFutureDate()));
  }
  GetDataFromLocalStorage() {
    this.tripletData = JSON.parse(localStorage.getItem(this.dataKey));
    this.relations = JSON.parse(localStorage.getItem(this.relationKey));
    this.hasEntityPair = JSON.parse(localStorage.getItem("hasEntityPair"));
  }
  GetExpireDate(): Date {
    return new Date(JSON.parse(localStorage.getItem(this.expireKey)));
  }
  GetFutureDate(): Date {
    var minutesToAdd = 30;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    return futureDate;
  }
}
