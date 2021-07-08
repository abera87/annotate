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
  hasEntityPair:boolean;


  constructor(private tripletSrv: TripletsService) { }

  ngOnInit(): void {
    this.entititiesWithSentencesObject = this.tripletSrv.GetTripletsData();
    this.hasEntityPair=this.tripletSrv.hasEntityPair;
    this.tripletSrv.GetRelationsData().forEach((item, index) => {
      this.relations.push({ Id: item.Id, Text: item.Text, IsChecked: false });
    });

    if (this.entititiesWithSentencesObject.length > 0) {
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
