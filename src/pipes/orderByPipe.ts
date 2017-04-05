import {Injectable, Pipe} from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'orderBy' })
@Injectable()
export class OrderByPipe {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}