import { Injectable } from '@angular/core';
import Ajv from "ajv"
import { TripletsWithRelationsSchema } from '../Schemas/TripletsWithRelationsSchema';

@Injectable({
  providedIn: 'root'
})
export class JsonSchemaValidatorService {

  ajv: Ajv;
  constructor() {
    this.ajv = new Ajv();
  }

  Validate(data: any): { IsValid: boolean, ErrorDetails: null | { InstancePath: string, Message: string }[] } {
    let validator = this.ajv.compile(TripletsWithRelationsSchema);
    let result = validator(data);
    let resultDetails = {
      IsValid: result,
      ErrorDetails: result ? null : validator.errors.map(x => ({ InstancePath: x.instancePath, Message: x.message }))
    }
    return resultDetails;
  }
}
