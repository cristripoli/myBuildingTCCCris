import {Injectable} from '@angular/core';
import { Entry } from '../model/entry';

@Injectable()
export class BuildingCalcService {

    public totalSpent: number = 0;
    public totalSpentPaid: number = 0;
    public totalSpentNotPaid: number = 0;

    constructor() {
    }
    
    public sumTotalSpent(entries: Array<Entry>) {
      let total = 0;
      this.totalSpentPaid = 0;
      this.totalSpentNotPaid=0;
      
      for(let entry of entries){
          entry.setTotal(entry.getValue() * entry.getQuantity());
          total += entry.getTotal();
          if(entry.isPaid()){
            this.totalSpentPaid += entry.getTotal();
          }else{
            this.totalSpentNotPaid += entry.getTotal();
          }
        }

      console.log("Total: " + total);
      this.totalSpent = total;
      return total;
    }

    public calculateEstimatedValueProgress(estimatedValue: number) {
      return ((this.totalSpent * 100)/estimatedValue);
    }

    public calculateValueByMeter(value: number, metreage: number) {
      return (value / metreage);
    }

    public calculatePercent(value: number, estimatedValue: number) {
      return ((value * 100)/estimatedValue);
    }

    public getTotalSpent(){
      return this.totalSpent;
    }

    public setTotalSpent(totalSpent: number){
      this.totalSpent = totalSpent;
    }

    public getTotalSpentPaid(){
      return this.totalSpentPaid;
    }

    public setTotalSpentPaid(totalSpentPaid: number){
      this.totalSpentPaid = totalSpentPaid;
    }
    public getTotalSpentNotPaid(){
      return this.totalSpentNotPaid;
    }

    public setTotalSpentNotPaid(totalSpentNotPaid: number){
      this.totalSpentNotPaid = totalSpentNotPaid;
    }
}  