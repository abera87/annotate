import { Component, OnInit, ViewChild } from '@angular/core';
import { Triplet } from 'src/app/Entities/Triplet';
import { TripletsService } from 'src/app/services/triplets.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FileSaverOptions } from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-tab-output',
  templateUrl: './tab-output.component.html',
  styleUrls: ['./tab-output.component.scss']
})
export class TabOutputComponent implements OnInit {

  entititiesWithSentencesObject!: Triplet[];
  entitiesWithSentencesObjectOutput: Triplet[];
  options = new JsonEditorOptions();
  @ViewChild(JsonEditorComponent) editor!: JsonEditorComponent;

  fileServerOptions: FileSaverOptions = {
    autoBom: false,
  };

  constructor(private tripletSrv: TripletsService, private fileSaverService: FileSaverService) {
    this.options.mode = 'text';
    //this.options.modes = ['code', 'text', 'tree', 'view'];
    //this.options.schema = schema;
    this.options.statusBar = false;
    this.options.mainMenuBar = false;
    this.options.onChange = () => console.log(this.editor.get());

  }

  ngOnInit(): void {
    this.entitiesWithSentencesObjectOutput = this.tripletSrv.GetTripletsDataForOutput();
  }


  // GetTripletsAsString(){
  //   return JSON.stringify(this.entititiesWithSentencesObject,null,4);
  // }

  saveOutputText() {
    const fileName = `Output.json`;

    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([JSON.stringify(this.entitiesWithSentencesObjectOutput)], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName, undefined, this.fileServerOptions);
  }

}
