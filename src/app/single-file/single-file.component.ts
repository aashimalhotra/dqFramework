import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FileOptionsService} from '../file-options.service';

@Component({
  selector: 'app-single-file',
  templateUrl: './single-file.component.html',
  styleUrls: ['./single-file.component.scss']
})
export class SingleFileComponent implements OnInit {

  fileName: string;
  option: string;
  fileDqData: string;
  constructor(private route: ActivatedRoute, private fileOptions: FileOptionsService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.fileName = params['fileName'];
      this.option = params['option'];
    } );
  }

  getDqData() {
    this.router.navigate(['/options', this.option, this.fileName, 'editChecks']);
  }

}
