import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServaddPage } from './servadd.page';

const routes: Routes = [
  {
    path: '',
    component: ServaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServaddPageRoutingModule {}
