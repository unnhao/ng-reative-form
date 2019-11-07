import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidationPageComponent } from './validation-page/validation-page.component';

const routes: Routes = [
  { path: '', component: ValidationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
