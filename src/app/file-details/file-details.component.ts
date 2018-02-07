import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { HttpParams } from '@angular/common/http/src/params';

import {FileOptionsService} from '../file-options.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  fileRun: boolean;
  fileFirstRun: boolean;
  counter_temp: number;
  flag: boolean;
  checksNotChecked: any[];
  checksNotCheckedFinal: {};
  counter: number;
  showdiv: {};
  checksCombinations: any[];
  checks: string[];
  checksCombinationJson: JSON;
  columnsHavingChecks: JSON;
  idFormatmapping: JSON;
  columnsNotHavingChecks: string[];
  checksDetails: boolean;
  showColumns: boolean;
  showFormats: boolean;
  columns: string[];
  fileInfo: any;
  fileLoadInfo: any;
  keys: string[];
  formats: string[];
  dqData: string;
  target: any;
  checkboxes: any;
  selectedFile: string;
  selectedColumn: string;
  fileDetails: boolean;
  option: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
    private fileOptionService: FileOptionsService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.option = params['option'];
      console.log(this.option);
    });

    this.formats = [];
    this.keys = [];
    this.idFormatmapping = JSON.parse('{}');
    this.showFormats = true;
    this.http.get('http://localhost:8080/dqFrameWork/getfileNames', {responseType: 'text'}).subscribe(data => {
      this.fileInfo = JSON.parse('[' + data + ']');
      for (const i in this.fileInfo[0]) {
        if (this.fileInfo[0].hasOwnProperty(i)) {
          this.keys.push(i);
          this.idFormatmapping[this.fileInfo[0][i]] = i;
          this.formats.push(this.fileInfo[0][i]);
        }
      }
    });
    this.checks = [];
    this.http.get('http://localhost:8080/dqFrameWork/availDQchecks', {responseType: 'json'}).subscribe(data => {
      for (const j in data) {
        if (data[j]) {
          this.checks.push(data[j]);
        }
      }
      console.log(this.checks);
    });
    this.http.get('http://localhost:8080/dqFrameWork/joinedData', { responseType: 'json'}).subscribe(data => {
      console.log(data);
    });
    this.fileDetails = false;
    this.checksDetails = false;
    this.showColumns = false;
  }
  gotoPeoplesList() {
    const link = ['/options'];
    this.router.navigate(link);
  }

  gotoDqChecks() {
    this.target = document.getElementsByClassName('formatsCheckbox');
    this.checkboxes = [];
    for (let i = 0; i < this.target.length; i++) {
      this.checkboxes.push(this.target[i].getElementsByTagName('Input')[0]);
    }
    // this.checkboxes = this.target.getElementsByTagName('Input');
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (this.checkboxes[i].type === 'checkbox') {
        if (this.checkboxes[i].checked === true) {
          console.log(this.checkboxes[i]);
          this.selectedFile = this.checkboxes[i].name;
        }
      }
    }
    if (this.selectedFile) {
      this.showFormats = false;
      this.http.get('http://localhost:8080/dqFrameWork/getLastStatus', {responseType: 'text',
      params: {fileID: this.idFormatmapping[this.selectedFile]}}).subscribe(data => {
        this.fileLoadInfo = JSON.parse('[' + data + ']');
        console.log(this.fileLoadInfo);
        this.fileDetails = true;
        if (data) {
          this.fileRun = true;
        } else {
          this.fileFirstRun = true;
        }
      });
      this.columns = [];
      this.http.get('http://localhost:8080/dqFrameWork/fileSchema', {responseType: 'text',
      params: {fileID: this.idFormatmapping[this.selectedFile]}}).subscribe(data => {
        this.columns = data.split(',');
      });
    } else {
      alert('please select a file');
    }
  }

  getDqData() {
    this.fileDetails = false;
    this.showColumns = false;
    this.checksDetails = true;
    this.columnsNotHavingChecks = [];
    this.columnsHavingChecks = JSON.parse('{}');
    this.checksCombinations = Array.of(JSON.parse(this.fileOptionService.getchecks()));
    this.checksCombinationJson = this.checksCombinations[0];
    for (this.counter = 0; this.counter < this.columns.length; this.counter++) {
      if (this.checksCombinationJson[this.columns[this.counter]]) {
        this.columnsHavingChecks[this.columns[this.counter]] = this.checksCombinationJson[this.columns[this.counter]];
      } else {
        this.columnsNotHavingChecks.push(this.columns[this.counter]);
      }
    }
    console.log(this.columnsHavingChecks);
    this.showdiv = {};
    for (this.counter = 0; this.counter < this.columns.length; this.counter++) {
      this.showdiv[this.columns[this.counter]] = 'false';
    }
    this.checksNotCheckedFinal = {};
    for (this.counter = 0; this.counter < this.columns.length; this.counter++) {
      this.checksNotCheckedFinal[this.columns[this.counter]] = [];
    }
  }

  listOfChecks(column: string) {
    if (document.getElementById('plusminus' + column).innerHTML === '+') {
      this.showdiv[column] = 'true';
      document.getElementById('plusminus' + column).innerHTML = '-';
    } else {
      this.showdiv[column] = 'false';
      document.getElementById('plusminus' + column).innerHTML = '+';
    }
    let columnSelected: string, First_val: string[], first_val: string, Second_val: string;

    columnSelected = column;
    // this.showdiv[column] = 'true';
    First_val =  this.checksCombinations[0][column];
    this.checksNotChecked = [];
    if (this.checksCombinations[0][column]) {
      for (this.counter = 0; this.counter < this.checks.length; this.counter++) {
        this.flag = false;
        Second_val = this.checks[this.counter].toLowerCase().toString();
        for (this.counter_temp = 0; this.counter_temp < First_val.length; this.counter_temp++) {
          first_val = First_val[this.counter_temp].toLowerCase().toString();
          if (first_val === Second_val) {
            this.flag = true;
          }
        }
        if (this.flag === false) {
          this.checksNotChecked.push(Second_val);
        }
      }
      this.checksNotCheckedFinal[column] = this.checksNotChecked;
      console.log(this.checksNotChecked);
    }
  }

  doneEditing() {
    this.fileDetails = true;
    this.checksDetails = false;
  }

  addColumn() {
    if (document.getElementById('plusMinusColumn').innerHTML === '+') {
      this.showColumns = true;
      document.getElementById('plusMinusColumn').innerHTML = '-';
    } else {
      this.showColumns = false;
      document.getElementById('plusMinusColumn').innerHTML = '+';
    }
  }

  addColumnList(e) {
    this.selectedColumn = e.srcElement.nextSibling.data;
    console.log(e.srcElement.nextSibling.data);
    this.columnsHavingChecks[this.selectedColumn] = [];
    // this.checksDetails = false;
    // this.checksDetails = true;
  }

  runDQ() {
    this.http.get('http://localhost:8080/dqFrameWork/processFiles', {responseType: 'text',
    params: {fileNo:  this.idFormatmapping[this.selectedFile]}}).subscribe(data => {
      console.log(data);
    });
  }

  disAllowCheckbox(e) {
    this.target = document.getElementsByClassName('formatsCheckbox');
    this.checkboxes = [];
    for (let i = 0; i < this.target.length; i++) {
      this.checkboxes.push(this.target[i].getElementsByTagName('Input')[0]);
    }
    if (e.srcElement.checked) {
      for (let i = 0; i < this.checkboxes.length; i++) {
        if (this.checkboxes[i].type === 'checkbox') {
          if (this.checkboxes[i].checked === true) {
            console.log(this.checkboxes[i]);
          } else {
            this.checkboxes[i].disabled = true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.checkboxes.length; i++) {
        if (this.checkboxes[i].type === 'checkbox') {
            this.checkboxes[i].disabled = false;
        }
      }
    }
  }

  goToFiles () {
    this.selectedFile = null;
    this.showFormats = true;
    this.fileDetails = false;
    this.fileRun = false;
    this.fileFirstRun = false;
  }
}
