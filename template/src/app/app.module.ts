import { NgModuleFactory, NgModuleFactoryLoader, RendererFactory2, NgZone } from '@angular/core';
import { ServerModule, ɵServerRendererFactory2 } from '@angular/platform-server';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
export { AppComponent };

// declarations
export function instantiateServerRendererFactory(
  renderer: RendererFactory2, engine: ɵAnimationEngine, zone: NgZone) {
   return new ɵAnimationRendererFactory(renderer, engine, zone);
}
const createRenderer = ɵServerRendererFactory2.prototype.createRenderer;
ɵServerRendererFactory2.prototype.createRenderer = function () {
  const result = createRenderer.apply(this, arguments);
  const setProperty = result.setProperty;
  result.setProperty = function () {
    try {
      setProperty.apply(this, arguments);
    } catch (e) {
      if (e.message.indexOf('Found the synthetic') === -1) {
        throw e;
      }
    }
  };
  return result;
}

export const SERVER_RENDER_PROVIDERS = [
  {
    provide: RendererFactory2,
    useFactory: instantiateServerRendererFactory,
    deps: [ɵServerRendererFactory2, ɵAnimationEngine, NgZone]
  }
];

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
  providers: [SERVER_RENDER_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
