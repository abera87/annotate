import { Component, OnInit } from '@angular/core';

import { FileSaverOptions } from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';

import { TripletsService } from '../services/triplets.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  fileContent:string;
  fileServerOptions: FileSaverOptions = {
    autoBom: false,
  };

  constructor(private tripletsSrv: TripletsService, private fileSaverService: FileSaverService) { }

  ngOnInit(): void {
  }


  LoadSavedState(fileList:FileList):void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = (fileReader.result as string);
      let tripletsWithRelations=JSON.parse(self.fileContent);
      self.tripletsSrv.SetUploadedTripletsWithRelationsData(tripletsWithRelations);
    }
    fileReader.readAsText(file);
  }
  SaveCurrentState() {
    let tripletsWithRelations = this.tripletsSrv.GetTripletsDataForOutputWithRelations();
    const fileName = `CurrentState.json`;

    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([JSON.stringify(tripletsWithRelations)], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName, undefined, this.fileServerOptions);
  }
}
