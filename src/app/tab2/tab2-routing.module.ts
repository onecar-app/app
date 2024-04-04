import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'rules',
    loadChildren: () => import('../rules/rules.module').then( m => m.RulesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'pushes',
    loadChildren: () => import('../pushes/pushes.module').then( m => m.PushesPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('../feedback/feedback.module').then( m => m.FeedbackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
