import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-xml',
  templateUrl: './create-xml.component.html',
  styleUrls: ['./create-xml.component.css']
})
export class CreateXmlComponent implements OnInit {

  xmlForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.xmlForm = this.fb.group({
      'Application': this.fb.group({
        'PackageName':'',
        'DisplayName':'',
        'ClockType':'',
        'Description':'',
        'ClockPreviewType':'',
        'Settings':this.fb.group({
          'Item':this.fb.array([this.initItem()])
        })
      })
    });
  }

  initItem() {
    return this.fb.group({
      'setting_type':'',
      'title_type':'',
      'name':'',
      'Title':'',
      'Selection':this.fb.array([this.initSelection()])
    });
  }

  initSelection() {
    return this.fb.group({
      'default':'',
      'id':'',
      'DisplayContent':this.fb.array([this.initDisplayContent()])
    });
  }

  initDisplayContent() {
    return this.fb.group({
      'type':'',
      'content':''
    });
  }

  addItem() {
    (this.xmlForm.get("Application").get("Settings").get("Item") as FormArray).push(this.initItem());
  }

  deleteItem(ix) {
    (this.xmlForm.get("Application").get("Settings").get("Item") as FormArray).removeAt(ix);
  }

  addSelection(ix) {
    (<FormArray>(<FormArray>this.xmlForm.get("Application").get("Settings").get("Item")).at(ix).get("Selection")).push(this.initSelection());
  }

  deleteSelection(ix, iy) {
    (<FormArray>(<FormArray>this.xmlForm.get("Application").get("Settings").get("Item")).at(ix).get("Selection")).removeAt(iy);
  }

  addDisplayContent(ix,iy){
    (<FormArray>(<FormArray>(<FormArray>this.xmlForm.get("Application").get("Settings").get("Item")).at(ix).get("Selection")).
    at(iy).get('DisplayContent')).push(this.initDisplayContent());
  }

  deleteDisplayContent(ix,iy,iz){
    (<FormArray>(<FormArray>(<FormArray>this.xmlForm.get("Application").get("Settings").get("Item")).at(ix).get("Selection")).
    at(iy).get('DisplayContent')).removeAt(iz);
  }

  onSubmit(){
    const value = this.xmlForm.value;
    const xml = this.OBJtoXML(value)
    const blob = new Blob([this.formatXml(xml)], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);

    const herfElem = document.createElement('a');
    herfElem.setAttribute('target', '_blank');
    herfElem.setAttribute('href', url);
    herfElem.setAttribute('download', 'new-xml.xml');
    herfElem.click();
    this.xmlForm.reset();
  }

  OBJtoXML(obj) {
      var xml = '';
      for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += this.OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
      } else if (typeof obj[prop] == "object") {
        xml += this.OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }

  formatXml(xml) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    var tab = '\t';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
  }
  
  sanitize(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      return (value === null ? undefined : value);
    }));
  };
  
  }

