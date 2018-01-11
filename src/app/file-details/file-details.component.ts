import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { HttpParams } from '@angular/common/http/src/params';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

  fileInfo: string[];
  target: any;
  checkboxes: any;
  option: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.option = params['option'];
      console.log(this.option);
    });

    this.http.get('http://localhost:8080', {responseType: 'text'}).subscribe(data => {
      this.fileInfo = data.split(',');
      console.log(data);
    });
  }
  gotoPeoplesList() {
    const link = ['/options'];
    this.router.navigate(link);
  }

  gotoDqChecks() {
    this.target = document.getElementById('formats');
    this.checkboxes = this.target.getElementsByTagName('Input');
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (this.checkboxes[i].type === 'checkbox') {
        if (this.checkboxes[i].checked === true) {
          console.log(this.checkboxes[i]);
          // this.http.get('http://localhost:8080',{responseType:'text',params:{format:this.checkboxes[i].name}}).subscribe(data => {
          //   // this.fileInfo=data.split(",");
            this.router.navigate(['/options', this.option, this.checkboxes[i].name]);
          //   console.log(data);
          // });
        }
      }
    }

  }
}
