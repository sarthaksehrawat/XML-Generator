import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
})
export class SelectionComponent {
  _default: any;
  _id: any;
  displayContent: any;

  @Input()
  set selection(selection) {
    this._default = selection._default;
    this._id = selection._id;
    this.displayContent = Array.isArray(selection.DisplayContent)
      ? selection.DisplayContent
      : [selection.DisplayContent];
  }

  @Output()
  updateSelection = new EventEmitter<any>();

  @Output()
  deleteSelection = new EventEmitter<any>();

  dataChanged(e) {
    this.updateSelection.emit({
      _default: this._default,
      _id: this._id,
      DisplayContent: this.displayContent,
      [e.target.name]: e.target.value,
    });
  }

  addDisplayContent() {
    this.updateSelection.emit({
      _default: this._default,
      _id: this._id,
      DisplayContent: this.displayContent.concat({ _type: '', __text: '' }),
    });
  }

  deleteSelectionHandler() {
    this.deleteSelection.emit();
  }

  displayContentChange(e, idx) {
    const newDisplayContent = [...this.displayContent];
    newDisplayContent[idx] = {
      ...newDisplayContent[idx],
      [e.target.name]: e.target.value,
    };
    this.updateSelection.emit({
      _default: this._default,
      _id: this._id,
      DisplayContent: newDisplayContent,
    });
  }

  deleteDisplayContent(idx) {
    this.displayContent.splice(idx, 1);
    this.updateSelection.emit({
      _default: this._default,
      _id: this._id,
      DisplayContent: [...this.displayContent],
    });
  }
}
