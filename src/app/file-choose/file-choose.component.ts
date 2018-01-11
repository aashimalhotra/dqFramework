import { Component, OnInit } from '@angular/core';
import {FileOptionsService} from '../file-options.service';
import {FileInfo} from '../file-info';

@Component({
  selector: 'app-file-choose',
  templateUrl: './file-choose.component.html',
  styleUrls: ['./file-choose.component.scss'],
})
export class FileChooseComponent implements OnInit {

  fileOptions: string[]= [];
  constructor(private _fileOptionsService: FileOptionsService) {
   }
  ngOnInit() {
    this.fileOptions = this._fileOptionsService.getAll();
  }
}
