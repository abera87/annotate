import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { RelationMention } from 'src/app/Entities/RelationMention';
import { Triplet } from 'src/app/Entities/Triplet';
import { ItemNavigation } from '../../Entities/EnumType';
import { TripletsService } from 'src/app/services/triplets.service';

@Component({
  selector: 'app-tab-add-relation',
  templateUrl: './tab-add-relation.component.html',
  styleUrls: ['./tab-add-relation.component.scss']
})
export class TabAddRelationComponent implements OnInit {

  itemNavigation = ItemNavigation;
  entititiesWithSentencesObject!: Triplet[];
  currentSentenceIndex!: number;
  currentEntititiesWithSentenceObject!: Triplet|undefined;
  entityPairs!: RelationMention[];
  currentEntityPair!: RelationMention;
  entityPairIndex!: number;
  relations: { Id: number, Text: string, IsChecked: boolean }[] = [];


  constructor(private tripletSrv: TripletsService) { }

  ngOnInit(): void {
    this.entititiesWithSentencesObject = this.tripletSrv.GetTripletsData();
    this.tripletSrv.GetRelationsData().forEach((item, index) => {
      this.relations.push({ Id: item.Id, Text: item.Text, IsChecked: false });
    });

    if (this.entititiesWithSentencesObject.length > 0) {
      if (this.entititiesWithSentencesObject[0].RelationMentions === undefined)
        this.CreateEntityPair();
      this.currentEntititiesWithSentenceObject = this.entititiesWithSentencesObject[0];
      this.entityPairs = this.currentEntititiesWithSentenceObject.RelationMentions;
      this.currentSentenceIndex=0;
    }

  }
  ReadSentence(itemNav: ItemNavigation): void {
    console.log(itemNav);
    switch (itemNav) {
      case ItemNavigation.Next:
        if (this.entititiesWithSentencesObject.length - 1 > this.currentSentenceIndex)
          this.currentSentenceIndex++;
        else
          this.currentSentenceIndex = 0;
        break;
      case ItemNavigation.Previous:
        if (this.currentSentenceIndex > 0)
          this.currentSentenceIndex--;
        else
          this.currentSentenceIndex = this.entititiesWithSentencesObject.length - 1;
        break;
    }
    this.currentEntititiesWithSentenceObject = this.entititiesWithSentencesObject.find(x => x['SentId'] === this.currentSentenceIndex);
    this.entityPairs = this.entititiesWithSentencesObject[this.currentSentenceIndex].RelationMentions;
    if (this.entityPairs !== undefined && this.entityPairs.length > 0)
      this.currentEntityPair = this.entititiesWithSentencesObject[this.currentSentenceIndex].RelationMentions[0];

    // un checked all relation first
    this.relations.forEach((item, index) => this.relations[index].IsChecked = false);
  }

  CreateEntityPair(): void {
    for (let h = 0; h < this.entititiesWithSentencesObject.length; h++) {
      let currentItem = this.entititiesWithSentencesObject[h];
      this.entityPairs = [];
      if (currentItem.EntityMentions !== undefined)
        for (let i = 0; i < currentItem.EntityMentions.length; i++)
          for (let j = 0; j < currentItem.EntityMentions.length; j++) {
            if (i == j)
              continue;
            let entityPair = new RelationMention();
            entityPair.Arg1Text = currentItem.EntityMentions[i].Text;
            // entityPair.Arg1StartIndex = currentItem.EntityMentions[i].StartPositions[0];
            entityPair.Arg2Text = currentItem.EntityMentions[j].Text;
            //entityPair.Arg2StartIndex = currentItem.EntityMentions[j].StartPositions[0];
            //  let item = `${this.entities[i]} ${this.entities[j]}`;
            this.entityPairs.push(entityPair);
          }
      this.entititiesWithSentencesObject[h].RelationMentions = [...this.entityPairs];
    }
    this.currentEntityPair = this.entititiesWithSentencesObject[0].RelationMentions[0];// this.entityPairs[0];
    //this.entityPairIndex = 0;
    this.entityPairs = this.entititiesWithSentencesObject[0].RelationMentions;

  }

  CheckSelectedRelation(index: number) {
    this.relations = [];
    this.tripletSrv.GetRelationsData().forEach((item, index) => {
      this.relations.push({ Id: item.Id, Text: item.Text, IsChecked: false });
    });
    this.entityPairIndex = index;
    let ePair = this.entityPairs[index];
    let tempRelations = ePair.RelationNames;
    if (tempRelations !== undefined)
      tempRelations.forEach((item, i) => {
        let tempIndex = this.relations.findIndex(x => x.Text === item);
        if (tempIndex >= 0)
          this.relations[tempIndex].IsChecked = true;
      });
  }

  ChangedChkRelation(index: number) {
    let checkedValue = this.relations[index].IsChecked;
    if (this.entityPairs[this.entityPairIndex].RelationNames === undefined)
      this.entityPairs[this.entityPairIndex].RelationNames = [];
    if (checkedValue) {
      if (this.entityPairs[this.entityPairIndex].RelationNames.findIndex(x => x === this.relations[index].Text) < 0) {
        this.entityPairs[this.entityPairIndex].RelationNames.push(this.relations[index].Text);
      }
    }
    else {
      let ii = this.entityPairs[this.entityPairIndex].RelationNames.findIndex(x => x === this.relations[index].Text);
      if (ii >= 0) {
        this.entityPairs[this.entityPairIndex].RelationNames.slice(ii, 1);
      }
    }
  }
}
