import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfeditPageRoutingModule } from './profedit-routing.module';

import { ProfeditPage } from './profedit.page';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfeditPageRoutingModule,
    InputMaskModule
  ],
  declarations: [ProfeditPage]
})
export class ProfeditPageModule {}
