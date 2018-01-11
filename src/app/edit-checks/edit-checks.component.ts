import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { HttpParams } from '@angular/common/http/src/params';

import {FileOptionsService} from '../file-options.service';

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
  checksCombinations: any[];
  option: string;
  constructor(private _fileOptionService: FileOptionsService, private http: HttpClient,
     private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {

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
    });
  }

}
