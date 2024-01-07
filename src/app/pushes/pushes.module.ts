import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushesPageRoutingModule } from './pushes-routing.module';

import { PushesPage } from './pushes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushesPageRoutingModule
  ],
  declarations: [PushesPage]
})
export class PushesPageModule {}
