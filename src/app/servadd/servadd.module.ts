import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServaddPageRoutingModule } from './servadd-routing.module';

import { ServaddPage } from './servadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServaddPageRoutingModule
  ],
  declarations: [ServaddPage]
})
export class ServaddPageModule {}
