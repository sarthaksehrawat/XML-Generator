import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'

declare var require : any

@Component({
  selector: 'app-create-xml',
  templateUrl: './create-xml.component.html',
  styleUrls: ['./create-xml.component.css']
})
export class CreateXmlComponent implements OnInit {

  xmlForm: FormGroup;

  convert = require('js2xmlparser')

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.xmlForm = this.fb.group({
        'PackageName':'',
        'DisplayName':'',
        'ClockType':'',
        'Description':'',
        'ClockPreviewType':'',
        'Preview':this.fb.group({
          '@':this.fb.group({
            'version':''
          })
        }),
        'Settings':this.fb.group({
          'Item':this.fb.array([])
        })
    });
  }

  initItem() {
    return this.fb.group({
      '@':this.fb.group({
        'setting_type':'',
      'title_type':'',
      'name':''
      }),
      'Title':'',
      'Selection':this.fb.array([])
    });
  }

  initSelection() {
    return this.fb.group({
      '@':this.fb.group({
        'default':null,
        'id':''
      }),
      'DisplayContent':this.fb.array([])
    });
  }

  initDisplayContent() {
    return this.fb.group({
      '@':this.fb.group({
        'type':''
      }),
      '#':''
    });
  }

  addItem() {
    (this.xmlForm.get("Settings").get("Item") as FormArray).push(this.initItem());
  }

  deleteItem(ix) {
    (this.xmlForm.get("Settings").get("Item") as FormArray).removeAt(ix);
  }

  addSelection(ix) {
    (<FormArray>(<FormArray>this.xmlForm.get("Settings").get("Item")).at(ix).get("Selection")).push(this.initSelection());
  }

  deleteSelection(ix, iy) {
    (<FormArray>(<FormArray>this.xmlForm.get("Settings").get("Item")).at(ix).get("Selection")).removeAt(iy);
  }

  addDisplayContent(ix,iy){
    (<FormArray>(<FormArray>(<FormArray>this.xmlForm.get("Settings").get("Item")).at(ix).get("Selection")).
    at(iy).get('DisplayContent')).push(this.initDisplayContent());
  }

  deleteDisplayContent(ix,iy,iz){
    (<FormArray>(<FormArray>(<FormArray>this.xmlForm.get("Settings").get("Item")).at(ix).get("Selection")).
    at(iy).get('DisplayContent')).removeAt(iz);
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

  formatXml(xml) { 
    var formatted = '', indent= '';
    var tab = '\t';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); 
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              
    });
    return formatted.substring(1, formatted.length-3);
  }
  
  sanitize(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      return (value === null ? undefined : value);
    }));
  };

  onSubmit(){
    var formValue = this.xmlForm.value
    var sani = this.sanitize(formValue)
    var result = this.convert.parse("Application",sani)
    const blob = new Blob([result], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);

    const herfElem = document.createElement('a');
    herfElem.setAttribute('target', '_blank');
    herfElem.setAttribute('href', url);
    herfElem.setAttribute('download', 'new-xml.xml');
    herfElem.click();
    this.xmlForm.reset();
  }
  
  }

