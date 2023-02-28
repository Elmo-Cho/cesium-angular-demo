import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SystemDictItemComponent } from './dict-item/dict-item.component';
import { SystemDictItemEditComponent } from './dict-item/edit/edit.component';
import { SystemDictItemViewComponent } from './dict-item/view/view.component';
import { SystemDictComponent } from './dict/dict.component';
import { SystemDictEditComponent } from './dict/edit/edit.component';
import { SystemRoutingModule } from './system-routing.module';

const COMPONENTS: Array<Type<void>> = [
  SystemDictComponent,
  SystemDictEditComponent,
  SystemDictItemComponent,
  SystemDictItemEditComponent,
  SystemDictItemViewComponent
];

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: COMPONENTS
})
// eslint-disable-next-line prettier/prettier
export class SystemModule { }
