import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareditPageRoutingModule } from './caredit-routing.module';

import { CareditPage } from './caredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareditPageRoutingModule
  ],
  declarations: [CareditPage]
})
export class CareditPageModule {}
