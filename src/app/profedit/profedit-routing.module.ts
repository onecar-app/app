import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfeditPage } from './profedit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfeditPageRoutingModule {}
