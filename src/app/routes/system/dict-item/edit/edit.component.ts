import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-system-dict-item-edit',
  templateUrl: './edit.component.html'
})
export class SystemDictItemEditComponent {
  record: any = undefined;

  dictId?: string;
  schema: SFSchema = {
    properties: {
      itemText: { type: 'string', title: '名称' },
      itemValue: { type: 'string', title: '数据值' },
      status: {
        type: 'boolean',
        title: '是否启用',
        ui: {
          checkedChildren: '开',
          unCheckedChildren: '关'
        },
        default: true
      },
      sortOrder: { type: 'number', title: '排序', default: 1 },
      description: { type: 'string', title: '描述' }
    },
    required: ['itemText', 'itemValue']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 90
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string'
    },
    $description: {
      widget: 'textarea',
      autosize: { minRows: 3, maxRows: 6 }
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  save(value: any): void {
    value.status = value.status ? 1 : 0;
    value.dictId = this.dictId;
    console.log(value);
    if (this.record === undefined) {
      this.http.post(`/api/sys/dictItem/add`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/api/sys/dictItem/edit`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close(): void {
    this.modal.destroy();
  }
}
