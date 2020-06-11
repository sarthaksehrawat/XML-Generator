import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root-tags',
  templateUrl: './root-tags.component.html',
  styleUrls: ['./root-tags.component.css'],
})
export class RootTagsComponent {
  rootParamsWithoutPackage: any;
  rootParamsPackageVersion: any;

  @Input()
  set rootParamsExceptSettings(rootParamsExceptSettings) {
    const {
      Preview: rootParamsPackageVersion,
      ...rootParamsWithoutPackage
    } = rootParamsExceptSettings;
    this.rootParamsPackageVersion = rootParamsPackageVersion;
    this.rootParamsWithoutPackage = rootParamsWithoutPackage;
  }

  @Output()
  updateRootsHandler = new EventEmitter<any>();

  dataChanged(e) {
    this.updateRootsHandler.emit({
      ...this.rootParamsWithoutPackage,
      Preview: this.rootParamsPackageVersion,
      [e.target.name]: e.target.value,
    });
  }

  rootParamsPackageVersionChange(e) {
    this.updateRootsHandler.emit({
      ...this.rootParamsWithoutPackage,
      Preview: { _version: e.target.value },
    });
  }
}
