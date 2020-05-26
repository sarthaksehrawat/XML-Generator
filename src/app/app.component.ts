import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  rootTag = '';
  rootParamsExceptSettings: any = {};
  settings: any = [];
  create=false;
  modify=false;
  buttonClick=true;

  createXml(e){
    this.create = true;
    this.buttonClick = false
  }

  modifyXml(e){
    this.modify = true;
    this.buttonClick = false
  }

  uploadedSchemaHandler(e) {
    // this could be made input or get the only key from object, but hardcoded as it does't really matter, at the moment
    this.rootTag = 'Application';
    Object.entries(e.Application).forEach((rootEntry: any) => {
      if (rootEntry[0] === 'Settings') {
        this.settings = Array.isArray(rootEntry[1].Item) ? rootEntry[1].Item : [rootEntry[1].Item];
      } else {
        this.rootParamsExceptSettings[rootEntry[0]] = rootEntry[1];
      }
    });
  }

  updateRootsHandler(e) {
    this.rootParamsExceptSettings = e;
  }

  updateSettingHandler(e, idx) {
    const newSettings = [...this.settings];
    newSettings[idx] = e;
    this.settings = newSettings;
  }

  addSetting(e) {
    this.settings.push({
      Title: '',
      name: '',
      setting_type: '',
      title_type: '',
      Selection: [],
    });
  }

  deleteSetting(idx) {
    this.settings.splice(idx, 1);
  }

  onSumit(e) {
    e.preventDefault();
    const preXml = {
      [this.rootTag]: {
        ...this.rootParamsExceptSettings,
        Settings: { Item: this.settings },
      },
    };

    // @ts-ignore
    const transformer = new X2JS();
    const data = transformer.json2xml_str(preXml);

    const blob = new Blob([data], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);

    const herfElem = document.createElement('a');
    herfElem.setAttribute('target', '_blank');
    herfElem.setAttribute('href', url);
    herfElem.setAttribute('download', 'new-xml.xml');
    herfElem.click();
  }
}
