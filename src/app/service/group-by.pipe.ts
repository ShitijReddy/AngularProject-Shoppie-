import { Pipe, PipeTransform } from '@angular/core';
import { groupBy as _groupBy } from 'lodash-es';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(value: any[], property: string): any {
    return _groupBy(value, property);
  }
}
