import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FileChooseComponent} from './file-choose/file-choose.component';
import {FileDetailsComponent} from './file-details/file-details.component';
import {SingleFileComponent} from './single-file/single-file.component';
import {EditChecksComponent} from './edit-checks/edit-checks.component';

const routes: Routes = [
    {
        path: 'options',
        component: FileChooseComponent
    },
    {
        path: 'options/:option',
        component: FileDetailsComponent,
    },
    {
        path: 'options/:option/:fileName',
        component: SingleFileComponent
    },
    {
        path: '',
        redirectTo: '/options',
        pathMatch: 'full'
    },
    {
        path: 'options/:option/:fileName/editChecks',
        component: EditChecksComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
