import { Component, OnInit } from '@angular/core';
import { TripletsService } from 'src/app/services/triplets.service';

@Component({
  selector: 'app-tab-relation',
  templateUrl: './tab-relation.component.html',
  styleUrls: ['./tab-relation.component.scss']
})
export class TabRelationComponent implements OnInit {
  inputRelation!: string;
  relations!: { Id: number, Text: string }[];
  constructor(private tripletSrv: TripletsService) { }

  ngOnInit(): void {
    this.relations = this.tripletSrv.GetRelationsData();
  }

  ReadRelation() {
    if (this.inputRelation.trim() !== '') {
      let r = this.inputRelation.split('\n');
      r.forEach((element, index) => {
        if (element.trim() !== "")
          this.relations.push({ Id: index, Text: element.trim() });
      });
    }
  }

}
