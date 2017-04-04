import {Injectable} from '@angular/core';
import { State } from '../model/state';

@Injectable()
export class StateService {

    convertDataToStateList(data:any):Array<State> {

       let state:State;
       let stateList = new Array<State>();
     
       for (let json of data) {
         console.log("json: " + json);
         state = new State(json.id,json.name,json.initials);
         console.log("Object state get: " + state.getName());
         stateList.push(state);
       }

       return stateList
    }

    public convertStateToJson(state: State){
      let stateJson = JSON.stringify({
        "name": state.getName(),
        "initials": state.getInitials()
      });
      return stateJson;
  }
}