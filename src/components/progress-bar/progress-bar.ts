import { Component, Input } from '@angular/core';

/*
  Generated class for the ProgressBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'progress-bar, decimal-pipe',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

   @Input('progress') progress;

  constructor() {
    console.log('Hello ProgressBar Component');
  }

}
