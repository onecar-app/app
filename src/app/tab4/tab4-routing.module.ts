import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'servadd',
    loadChildren: () => import('../servadd/servadd.module').then( m => m.ServaddPageModule)
  },
  {
    path: 'servinfo/:id',
    loadChildren: () => import('../servinfo/servinfo.module').then( m => m.ServinfoPageModule)
  },
  {
    path: 'pdf',
    loadChildren:() => import('../pdf/pdf.module').then(m => m.PdfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
