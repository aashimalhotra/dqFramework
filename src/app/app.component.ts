import { Component } from '@angular/core';
import {FileOptionsService} from './file-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FileOptionsService]
})
export class AppComponent {
  title=  'Data Quality Framework';
  fileOptions: string[];
  constructor(private _fileOptionsService: FileOptionsService) {
   }
  ngOnInit() {
    this.fileOptions = this._fileOptionsService.getAll();
  }
}
