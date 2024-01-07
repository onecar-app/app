import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaraddPage } from './caradd.page';

const routes: Routes = [
  {
    path: '',
    component: CaraddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaraddPageRoutingModule {}
