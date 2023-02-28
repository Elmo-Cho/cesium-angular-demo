import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { CesiumCesiumDemoComponent } from './cesium-demo/cesium-demo.component';
import { CesiumRoutingModule } from './cesium-routing.module';
import { CesiumDirective } from './cesium.directive';

const COMPONENTS: Array<Type<void>> = [CesiumCesiumDemoComponent, CesiumDirective];

@NgModule({
  imports: [SharedModule, CesiumRoutingModule, NzDrawerModule],
  declarations: COMPONENTS
})
export class CesiumModule {}
