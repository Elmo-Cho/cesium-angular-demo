import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemDictItemComponent } from './dict-item/dict-item.component';
import { SystemDictComponent } from './dict/dict.component';

const routes: Routes = [
  { path: 'dict', component: SystemDictComponent },
  { path: 'dict-item', component: SystemDictItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// eslint-disable-next-line prettier/prettier
export class SystemRoutingModule { }
