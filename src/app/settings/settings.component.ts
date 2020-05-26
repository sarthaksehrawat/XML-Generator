import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  Title: string;
  name: string;
  setting_type: string;
  title_type: string;
  selections: any = [];

  @Input()
  set setting(setting: any) {
    this.Title = setting.Title;
    this.name = setting.name;
    this.setting_type = setting.setting_type;
    this.title_type = setting.title_type;
    this.selections = Array.isArray(setting.Selection) ? setting.Selection : [setting.Selection];
  }

  @Output()
  updateSettingHandler = new EventEmitter<any>();

  @Output()
  deleteSettingHandler = new EventEmitter<any>();

  changeInput(event) {
    this.updateSettingHandler.emit({
      Title: this.Title,
      name: this.name,
      setting_type: this.setting_type,
      title_type: this.title_type,
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
      name: this.name,
      setting_type: this.setting_type,
      title_type: this.title_type,
      Selection: newSelections,
    });
  }

  addSelection() {
    this.updateSettingHandler.emit({
      Title: this.Title,
      name: this.name,
      setting_type: this.setting_type,
      title_type: this.title_type,
      Selection: [
        ...this.selections,
        {
          DisplayContent: [],
          default: '',
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
      name: this.name,
      setting_type: this.setting_type,
      title_type: this.title_type,
      Selection: [...this.selections],
    });
  }
}
