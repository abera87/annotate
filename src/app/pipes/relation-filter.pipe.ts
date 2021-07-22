import { Pipe, PipeTransform } from '@angular/core';
import { Relation } from '../Entities/Relation';

@Pipe({
  name: 'relationFilter',
  pure: false
})
export class RelationFilterPipe implements PipeTransform {

  transform(values: Relation[], ...args: any): any[] {
    return values.reduce((acc, value, index) =>
      value.Text.toLocaleLowerCase().includes(args) ? [...acc, { index, value }] : acc, []
    );
  }

}
