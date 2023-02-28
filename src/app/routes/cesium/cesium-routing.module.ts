import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CesiumCesiumDemoComponent } from './cesium-demo/cesium-demo.component';

const routes: Routes = [{ path: '', component: CesiumCesiumDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CesiumRoutingModule {}
