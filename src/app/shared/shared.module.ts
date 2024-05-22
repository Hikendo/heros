import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './pages/error404/error404.component';



@NgModule({
  declarations: [

    Error404Component
  ],

  exports:[
    Error404Component
  ]
})
export class SharedModule { }
