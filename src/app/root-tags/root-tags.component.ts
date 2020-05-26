import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root-tags',
  templateUrl: './root-tags.component.html',
  styleUrls: ['./root-tags.component.css']
})
export class RootTagsComponent {

  @Input()
  rootParamsExceptSettings: any;

  @Output()
  updateRootsHandler = new EventEmitter<any>();

  dataChanged(e) {
    this.updateRootsHandler.emit({
      ...this.rootParamsExceptSettings,
      [e.target.name]: e.target.value,
    });
  }
}
