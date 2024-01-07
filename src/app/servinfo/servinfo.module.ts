import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServinfoPageRoutingModule } from './servinfo-routing.module';

import { ServinfoPage } from './servinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServinfoPageRoutingModule
  ],
  declarations: [ServinfoPage]
})
export class ServinfoPageModule {}
