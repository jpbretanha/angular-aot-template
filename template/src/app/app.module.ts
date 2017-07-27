import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
export { AppComponent };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'template' }),
    RouterModule.forRoot([
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    FormsModule,
    HttpModule
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
