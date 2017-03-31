import {Injectable} from '@angular/core';
import { Entry } from '../model/entry';

@Injectable()
export class BuildingCalcService {

    public totalSpent: number = 0;
    constructor() {
    }
    
    public sumTotalSpentByCategory(entries: Array<Entry>) {
      let total = 0;
      for(let entry of entries){
          total += entry.getValue();
        }

      console.log("Total: " + total);
      this.totalSpent += total;
      return total;
    }

    public calculateEstimatedValueProgress(estimatedValue: number) {
      return ((this.totalSpent * 100)/estimatedValue);
    }

    public getTotalSpent(){
      return this.totalSpent;
    }

    public setTotalSpent(totalSpent: number){
      this.totalSpent = totalSpent;
    }
}  