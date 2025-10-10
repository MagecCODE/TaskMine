import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskFormPage } from './task-form.page';

const routes: Routes = [
  {
    path: '',
    component: TaskFormPage,
  },
  {
    path: ':id',
    component: TaskFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskFormPageRoutingModule {}
