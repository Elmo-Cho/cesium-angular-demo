import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SystemDictItemService } from './dict-item.service';
import { SystemDictItemEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-system-dict-item',
  templateUrl: './dict-item.component.html'
})
export class SystemDictItemComponent implements OnInit {
  url = ``;
  record: any;
  searchSchema: SFSchema = {
    properties: {
      itemText: {
        type: 'string',
        title: '名称'
      },
      status: {
        type: 'string',
        title: '状态',
        enum: [
          { label: '启用', value: '1', disabled: false },
          { label: '不启用', value: '0', disabled: false }
        ]
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'itemText' },
    { title: '数据值', index: 'itemValue' },
    { title: '状态', index: 'status_dictText', className: 'text-center', width: 80 },
    {
      title: '操作',
      className: 'text-center',
      width: 110,
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SystemDictItemEditComponent,
            params: record => {
              return { dictId: this.record.id, record };
            }
          },
          click: 'reload'
        },
        {
          text: '删除',
          type: 'del',
          click: (record, modal, instance) => {
            this.dictItemService.deleteDictItem(record.id).subscribe(res => {
              console.log(res);
              if (res.success) {
                this.message.create('success', `删除成功`);
                this.st.reload();
              }
            });
          }
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private message: NzMessageService,
    private dictItemService: SystemDictItemService
  ) {}

  ngOnInit(): void {
    this.url = `/api/sys/dictItem/list?dictId=${this.record.id}`;
    console.log(this.record.id);
  }

  add(): void {
    this.modal.createStatic(SystemDictItemEditComponent, { dictId: this.record.id }, { size: 'md' }).subscribe(() => this.st.reload());
  }
}
