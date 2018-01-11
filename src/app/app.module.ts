import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FileChooseComponent } from './file-choose/file-choose.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import { SingleFileComponent } from './single-file/single-file.component';
import { EditChecksComponent } from './edit-checks/edit-checks.component';

@NgModule({
  declarations: [
    AppComponent,
    FileChooseComponent,
    FileDetailsComponent,
    SingleFileComponent,
    EditChecksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
