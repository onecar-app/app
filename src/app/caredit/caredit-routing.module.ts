import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareditPage } from './caredit.page';

const routes: Routes = [
  {
    path: '',
    component: CareditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareditPageRoutingModule {}
