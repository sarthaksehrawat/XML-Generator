import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  @Output()
  uploadedSchema = new EventEmitter<any>();

  elem = null;

  uploadAction() {
    const inputElement = document.getElementById('file-selector');
    this.elem = inputElement;
    inputElement.click();
  }

  onFileChange(event) {
    const fileList = event.target.files;

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      // @ts-ignore
      const transformer = new X2JS();
      const uploadedSchema = transformer.xml_str2json(event.target.result);
      this.uploadedSchema.emit(uploadedSchema);
      if(this.elem) {
        this.elem.value = '';
      }
    });
    reader.readAsText(fileList[0]);
  }
}
