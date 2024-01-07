import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sms',
    loadChildren: () => import('./sms/sms.module').then( m => m.SmsPageModule)
  },
  {
    path: 'caradd',
    loadChildren: () => import('./caradd/caradd.module').then( m => m.CaraddPageModule)
  },
  {
    path: 'profedit',
    loadChildren: () => import('./profedit/profedit.module').then( m => m.ProfeditPageModule)
  },
  {
    path: 'carinfo',
    loadChildren: () => import('./carinfo/carinfo.module').then( m => m.CarinfoPageModule)
  },
  {
    path: 'servinfo/:id',
    loadChildren: () => import('./servinfo/servinfo.module').then( m => m.ServinfoPageModule)
  },
  {
    path: 'rules',
    loadChildren: () => import('./rules/rules.module').then( m => m.RulesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'pushes',
    loadChildren: () => import('./pushes/pushes.module').then( m => m.PushesPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'caredit',
    loadChildren: () => import('./caredit/caredit.module').then( m => m.CareditPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
