import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SystemDictItemComponent } from '../dict-item/dict-item.component';
import { SystemDictService } from './dict.service';
import { SystemDictEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-system-dict',
  templateUrl: './dict.component.html'
})
export class SystemDictComponent {
  url = `/api/sys/dict/list`;
  searchSchema: SFSchema = {
    properties: {
      dictName: {
        type: 'string',
        title: '字典名称'
      },
      dictCode: {
        type: 'string',
        title: '字典编码'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'no', className: 'text-center', width: 70 },
    { title: '字典名称', index: 'dictName' },
    { title: '字典编码', index: 'dictCode' },
    { title: '字典描述', index: 'description' },
    {
      title: '操作',
      className: 'text-center',
      width: 200,
      buttons: [
        { text: '字典配置', type: 'drawer', drawer: { title: '字典列表', component: SystemDictItemComponent, size: 700 } },
        {
          text: '编辑',
          click: (record, modal, instance) => {
            this.modal.createStatic(SystemDictEditComponent, { data: record }, { size: 'md' }).subscribe(() => this.st.reload());
          }
        },
        {
          text: '删除',
          type: 'del',
          click: (record, modal, instance) => {
            this.dictService.deleteDict(record.id).subscribe(res => {
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
    private dictService: SystemDictService,
    private http: _HttpClient,
    private modal: ModalHelper,
    private message: NzMessageService
  ) {}

  add(): void {
    this.modal.createStatic(SystemDictEditComponent, {}, { size: 'md' }).subscribe(() => this.st.reload());
  }

  refreshCache(): void {
    this.dictService.refreshCache().subscribe(res => {
      if (res.success) {
        this.message.create('success', `刷新缓存成功`);
        this.st.reload();
      }
    });
  }
}
