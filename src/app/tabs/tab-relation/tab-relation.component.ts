import { Component, OnInit } from '@angular/core';
import { TripletsService } from 'src/app/services/triplets.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tab-relation',
  templateUrl: './tab-relation.component.html',
  styleUrls: ['./tab-relation.component.scss']
})
export class TabRelationComponent implements OnInit {
  inputRelation!: string;
  relations!: { Id: number, Text: string }[];
  hasEntityPair: boolean;

  constructor(private tripletSrv: TripletsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.relations = this.tripletSrv.GetRelationsData();
    this.hasEntityPair = this.tripletSrv.hasEntityPair;
  }

  ReadRelation() {
    if (this.EnableReadButton() && this.inputRelation.trim() !== '') {
      let r = this.inputRelation.split('\n');
      r.forEach((element, index) => {
        if (element.trim() !== "")
          this.relations.push({ Id: index, Text: element.trim() });
      });

      this.toastr.success("Relation added", "Relation");
    }
  }

  EnableReadButton() {
    return !(this.hasEntityPair && this.relations.length > 0);
  }

}
