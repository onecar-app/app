import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServinfoPage } from './servinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ServinfoPage
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
export class ServinfoPageRoutingModule {}
