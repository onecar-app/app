import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }, {
    path: 'profedit',
    loadChildren: () => import('../profedit/profedit.module').then(m => m.ProfeditPageModule)
  }, {
    path: 'pushes',
    loadChildren: () => import('../pushes/pushes.module').then(m => m.PushesPageModule)
  }, {
    path: 'servadd',
    loadChildren: () => import('../servadd/servadd.module').then(m => m.ServaddPageModule)
  },{
    path:'servadd/:id',
    loadChildren:() => import('../servadd/servadd.module').then(m => m.ServaddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }
