import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [CommonModule],
  declarations: [],
})
export class SharedModule {}
