import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class FileOptionsService {
  dqData: string;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  getAll(): string[] {
    return ['Existing', 'New', 'Stats'];
  }
  getchecks(): string {
    return JSON.stringify({ 'PROD_ID': ['null'], 'FORM_DESC': ['null'], 'STRNT_DESC': ['null'], 'prod_nm': ['null'],
     'PACK_SZ_EAES_CNT': ['null', 'isDecimal'] });
  }
}
