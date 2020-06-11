import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  Title: string;
  _name: string;
  _setting_type: string;
  _title_type: string;
  selections: any = [];

  @Input()
  set setting(setting: any) {
    this.Title = setting.Title;
    this._name = setting._name;
    this._setting_type = setting._setting_type;
    this._title_type = setting._title_type;
    this.selections = Array.isArray(setting.Selection) ? setting.Selection : [setting.Selection];
  }

  @Output()
  updateSettingHandler = new EventEmitter<any>();

  @Output()
  deleteSettingHandler = new EventEmitter<any>();

  changeInput(event) {
    this.updateSettingHandler.emit({
      Title: this.Title,
      _name: this._name,
      _setting_type: this._setting_type,
      _title_type: this._title_type,
      Selection: this.selections,
      [event.target.name]: event.target.value,
    });
  }

  updateSelectionHandler(e, idx) {
    const newSelections = [...this.selections];
    newSelections[idx] = e;
    this.selections[idx] = e;
    this.updateSettingHandler.emit({
      Title: this.Title,
      _name: this._name,
      _setting_type: this._setting_type,
      _title_type: this._title_type,
      Selection: newSelections,
    });
  }

  addSelection() {
    this.updateSettingHandler.emit({
      Title: this.Title,
      _name: this._name,
      _setting_type: this._setting_type,
      _title_type: this._title_type,
      Selection: [
        ...this.selections,
        {
          DisplayContent: [],
          default: null,
          id: '',
        },
      ],
    });
  }

  deleteSetting() {
    this.deleteSettingHandler.emit();
  }

  deleteSelectionHandler(idx) {
    this.selections.splice(idx, 1);
    this.updateSettingHandler.emit({
      Title: this.Title,
      _name: this._name,
      _setting_type: this._setting_type,
      _title_type: this._title_type,
      Selection: [...this.selections],
    });
  }
}
