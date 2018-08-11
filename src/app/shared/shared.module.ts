import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { TipsComponent } from './tips/tips.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    StarComponent,
    TipsComponent
  ],
  declarations: [
    StarComponent,
    TipsComponent
  ]
})
export class SharedModule { }
