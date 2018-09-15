import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.css']
})
export class ResetButtonComponent {
  @Output()
  resetEmitter:EventEmitter<any> = new EventEmitter<any>(); 
  
  resetVoteOptions() {
    this.resetEmitter.emit();
  }
}
