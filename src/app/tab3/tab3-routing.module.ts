import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'carinfo/:id',
    loadChildren: () => import('../carinfo/carinfo.module').then( m => m.CarinfoPageModule)
  },
  {
    path: 'caradd',
    loadChildren: () => import('../caradd/caradd.module').then( m => m.CaraddPageModule)
  },
  {
    path: 'caredit/:id',
    loadChildren: () => import('../caredit/caredit.module').then( m => m.CareditPageModule)
  },
  {
    path: 'profedit',
    loadChildren: () => import('../profedit/profedit.module').then( m => m.ProfeditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
