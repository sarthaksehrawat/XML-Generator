import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component';
import { SelectionComponent } from './selection/selection.component';
import { RootTagsComponent } from './root-tags/root-tags.component';
import { CreateXmlComponent } from './create-xml/create-xml.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    RootTagsComponent,
    SettingsComponent,
    SelectionComponent,
    CreateXmlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
