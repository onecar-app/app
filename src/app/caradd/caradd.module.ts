import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaraddPageRoutingModule } from './caradd-routing.module';

import { CaraddPage } from './caradd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaraddPageRoutingModule
  ],
  declarations: [CaraddPage]
})
export class CaraddPageModule {}
