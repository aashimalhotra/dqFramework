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
  columnsNotHavingChecks: string[];
  checksDetails: boolean;
  showColumns: boolean;
  columns: string[];
  fileInfo: string[];
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

    this.http.get('http://localhost:8080', {responseType: 'text'}).subscribe(data => {
      this.fileInfo = data.split(',');
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
    this.fileDetails = true;
    this.target = document.getElementById('formats');
    this.checkboxes = this.target.getElementsByTagName('Input');
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (this.checkboxes[i].type === 'checkbox') {
        if (this.checkboxes[i].checked === true) {
          console.log(this.checkboxes[i]);
          this.selectedFile = this.checkboxes[i].name;
          // this.http.get('http://localhost:8080',{responseType:'text',params:{format:this.checkboxes[i].name}}).subscribe(data => {
          //   // this.fileInfo=data.split(",");
            // this.router.navigate(['/options', this.option, this.checkboxes[i].name]);
          //   console.log(data);
          // });
        }
      }
    }

  }

  getDqData() {
    this.fileDetails = false;
    this.checksDetails = true;
      this.http.get('http://localhost:8080/dqdata', {responseType: 'text', params: {file: this.selectedFile}}).subscribe(data => {
      this.dqData = data.toString();
      console.log(this.dqData);
      this.columnsNotHavingChecks = [];
      this.columnsHavingChecks = JSON.parse('{}');
      this.columns = this.dqData.split(':')[0].split(',');
      this.checks = this.dqData.split(':')[1].split(',');
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
    });
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
    this.showColumns = true;
  }

  addColumnList(e) {
    this.selectedColumn = e.srcElement.nextSibling.data;
    console.log(e.srcElement.nextSibling.data);
    this.columnsHavingChecks[this.selectedColumn] = [];
  }
}
