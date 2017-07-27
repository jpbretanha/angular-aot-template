import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
