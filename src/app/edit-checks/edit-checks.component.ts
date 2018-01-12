import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { HttpParams } from '@angular/common/http/src/params';

import {FileOptionsService} from '../file-options.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-edit-checks',
  templateUrl: './edit-checks.component.html',
  styleUrls: ['./edit-checks.component.scss']
})
export class EditChecksComponent implements OnInit {

  dqData: string;
  fileName: string;
  columns: string[];
  checks: string[];
  counter: number;
  counter_temp: number;
  showdiv: any;
  flag: boolean;
  checksCombinations: any[];
  checksNotChecked: string[];
  checksNotCheckedFinal: any;
  option: string;
  columnSelected: string;
  First_val: string[];
  first_val: string;
  Second_val: string;
  constructor(private _fileOptionService: FileOptionsService, private http: HttpClient,
     private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {

    this.counter_temp = 0;

    this.route.params.subscribe((params: Params) => {
      this.fileName = params['fileName'];
      this.option = params['option'];
    } );

    this.http.get('http://localhost:8080/dqdata', {responseType: 'text', params: {file: this.fileName}}).subscribe(data => {
      this.dqData = data.toString();
      console.log(this.dqData);
      this.columns = this.dqData.split(':')[0].split(',');
      this.checks = this.dqData.split(':')[1].split(',');
      this.checksCombinations = Array.of(JSON.parse(this._fileOptionService.getchecks()));
      console.log(this.checksCombinations['prodID']);
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
    this.columnSelected = column;
    this.showdiv[column] = 'true';
    this.First_val =  this.checksCombinations[0][column];
    this.checksNotChecked = [];
    if (this.checksCombinations[0][column]) {
      for (this.counter = 0; this.counter < this.checks.length; this.counter++) {
        this.flag = false;
        this.Second_val = this.checks[this.counter].toLowerCase().toString();
        for (this.counter_temp = 0; this.counter_temp < this.First_val.length; this.counter_temp++) {
          this.first_val = this.First_val[this.counter_temp].toLowerCase().toString();
          if (this.first_val === this.Second_val) {
            this.flag = true;
          }
        }
        if (this.flag === false) {
          this.checksNotChecked.push(this.Second_val);
        }
      }
      this.checksNotCheckedFinal[column] = this.checksNotChecked;
      console.log(this.checksNotChecked);
    }
  }

}
