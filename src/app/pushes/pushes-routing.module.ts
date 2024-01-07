import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushesPage } from './pushes.page';

const routes: Routes = [
  {
    path: '',
    component: PushesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushesPageRoutingModule {}
