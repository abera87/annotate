import { Injectable } from '@angular/core';
import { Triplet } from '../Entities/Triplet';

@Injectable({
  providedIn: 'root'
})
export class TripletsService {
 private tripletData: Triplet[];
 private relations:{Id:number,Text:string}[];
  constructor() {
    this.tripletData=[];
    this.relations=[];
   }

   GetTripletsData(){
     return this.tripletData;
   }
   GetRelationsData(){
     return this.relations;
   }
 

}
