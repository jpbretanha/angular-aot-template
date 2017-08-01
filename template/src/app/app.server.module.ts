/// <reference types="node" />
import { NgModule, NgModuleFactory, NgModuleFactoryLoader, RendererFactory2, NgZone } from '@angular/core';
import { ServerModule, ɵServerRendererFactory2 } from '@angular/platform-server';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';

import { AppModule, AppComponent } from './app.module';

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

export class ServerFactoryLoader extends NgModuleFactoryLoader {
  load(path: string): Promise<NgModuleFactory<any>> {
    return new Promise((resolve, reject) => {
      const [file, className] = path.split('#');
      const classes = require('../../dist/ngfactory/src/app' + file.slice(1) + '.ngfactory');
      resolve(classes[className + 'NgFactory']);
    });
  }
}

@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: ServerFactoryLoader },
    SERVER_RENDER_PROVIDERS //comentar essa linha se as rotas tiverem recarregando a pagina
  ]
})
export class AppServerModule { }
