import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectionRectangle, TextSelectEvent } from 'src/app/directives/text-seletion.directive';
import { Triplet } from 'src/app/Entities/Triplet';
import { TripletsService } from 'src/app/services/triplets.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-sentence',
  templateUrl: './tab-sentence.component.html',
  styleUrls: ['./tab-sentence.component.scss']
})
export class TabSentenceComponent implements OnInit, OnDestroy {
  sentences: string[] = [];
  entities: string[] | undefined = [];
  inputSentence!: string;
  hostRectangle: SelectionRectangle | null;
  private selectedText: string | undefined;
  tdId!: number;
  selectedSentId!: number;
  hasEntityPair: boolean;

  triplets!: Triplet[];
  IsUploadedTripletsWithRelationsData$: Subscription;

  constructor(private tripletSrv: TripletsService, private toastr: ToastrService) {
    this.hostRectangle = null;
    this.selectedText = "";
  }


  ngOnDestroy(): void {
    this.IsUploadedTripletsWithRelationsData$.unsubscribe();
  }


  ngOnInit(): void {
    this.IsUploadedTripletsWithRelationsData$ = this.tripletSrv.isUploadedTripletsWithRelationsData$.subscribe(data => {
      if (data) {
        this.triplets = this.tripletSrv.GetTripletsData();
        this.hasEntityPair = this.tripletSrv.hasEntityPair;
      }
    });
    this.triplets = this.tripletSrv.GetTripletsData();
    this.hasEntityPair = this.tripletSrv.hasEntityPair;
  }

  ClearAllData() {
    if (confirm("Are you sure, you want to clear all data?")) {
      this.tripletSrv.ClearAllData();
      this.entities = [];
      this.triplets = this.tripletSrv.GetTripletsData();
      this.hasEntityPair = this.tripletSrv.hasEntityPair;
      this.toastr.success("All data removed!!!", "Sentence");
    }
  }
  MakeEntityPair() {
    this.tripletSrv.CreateEntityPair();
    this.hasEntityPair = this.tripletSrv.hasEntityPair;
    this.toastr.success("Entity pair created!!!", "Entity");
  }
  ReadSentence() {
    this.tripletSrv.ClearAllData();
    if (this.inputSentence.trim() !== '') {
      this.sentences = this.inputSentence.split('\n');
      this.sentences.forEach((element, index) => {
        if (element.trim() !== "")
          this.triplets.push(new Triplet(index, element));
      });

      this.toastr.success("Ok!!!", "Sentence");
    }
  }
  AddEntity(sentId: number, text: string = "") {

    let sentence = this.triplets.find(x => x.SentId === sentId);
    if (sentence !== undefined && sentence.EntityMentions === undefined)
      sentence.EntityMentions = [];

    // check entity already exists
    if (sentence !== undefined && sentence.EntityMentions.find(x => x === text.trim()) === undefined) {
      sentence.EntityMentions.push(text === "" ? "Dummy" : text.trim());
      // if we push new entity, always clear realtion mentioned and relation name, doing for this sentence now
      if (sentence.RelationMentions !== undefined)
        sentence.RelationMentions.splice(0, sentence.RelationMentions.length);

      this.toastr.success(`Added ${text.trim()}!!!`, "Entity");
    }
    else {
      this.toastr.success(`${text.trim()} entity exist!!!`, "Entity");
    }

    if (this.entities === undefined)
      this.ShowEntities(sentId);


  }

  RemoveItem(item: string): void {
    let index = this.triplets[this.selectedSentId].EntityMentions.findIndex(x => x === item);
    if (index > -1) {
      this.triplets[this.selectedSentId].EntityMentions.splice(index, 1);
      this.toastr.success(`${item} removed !!!`, "Entity");
    }
    else {
      this.toastr.error(`Some issue to remove ${item}`, "Entity");
    }
  }

  ShowEntities(sentId: number) {
    if (this.triplets !== undefined) {
      this.entities = this.triplets.find(x => x.SentId === sentId)?.EntityMentions;
      this.selectedSentId = sentId;
    }
  }

  // I render the rectangles emitted by the [textSelect] directive.
  public renderRectangles(event: TextSelectEvent): void {

    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {

      this.hostRectangle = event.hostRectangle;
      this.selectedText = event.text;
      this.tdId = event.sentId;
    } else {

      this.hostRectangle = null;
      this.selectedText = "";

    }

  }
  // I share the selected text with friends :)
  public shareSelection(sentId: number): void {

    // console.group("Shared Text");
    // console.log(this.selectedText);
    // console.groupEnd();

    //
    this.AddEntity(sentId, this.selectedText);

    // Now that we've shared the text, let's clear the current selection.
    document.getSelection()?.removeAllRanges();
    // CAUTION: In modern browsers, the above call triggers a "selectionchange"
    // event, which implicitly calls our renderRectangles() callback. However,
    // in IE, the above call doesn't appear to trigger the "selectionchange"
    // event. As such, we need to remove the host rectangle explicitly.
    this.hostRectangle = null;
    this.selectedText = "";

  }


}
