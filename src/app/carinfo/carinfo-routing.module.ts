import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarinfoPage } from './carinfo.page';

const routes: Routes = [
  {
    path: '',
    component: CarinfoPage
  },
  {
    path: 'caredit/:id',
    loadChildren: () => import('../caredit/caredit.module').then( m => m.CareditPageModule)
  },
  {
    path: 'servinfo/:id',
    loadChildren: () => import('../servinfo/servinfo.module').then( m => m.ServinfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarinfoPageRoutingModule {}
