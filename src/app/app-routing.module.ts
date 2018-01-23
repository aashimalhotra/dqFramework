import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FileChooseComponent} from './file-choose/file-choose.component';
import {FileDetailsComponent} from './file-details/file-details.component';

const routes: Routes = [
    {
        path: 'options',
        component: FileChooseComponent
    },
    {
        path: ':option',
        component: FileDetailsComponent,
    },
    {
        path: '',
        redirectTo: '/options',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
