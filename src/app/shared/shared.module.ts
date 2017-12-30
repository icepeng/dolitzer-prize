import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    NavigatorComponent,
  ],
  imports: [CommonModule, ClarityModule],
  declarations: [NavigatorComponent],
})
export class SharedModule {}
