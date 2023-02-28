import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormProperty, PropertyGroup, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs';

@Component({
  selector: 'app-system-dict-edit',
  templateUrl: './edit.component.html'
})
export class SystemDictEditComponent implements OnInit {
  data?: any;
  schema: SFSchema = {
    properties: {
      dictName: { type: 'string', title: '字典名称', maxLength: 15 },
      dictCode: {
        type: 'string',
        title: '字典代码',
        ui: {
          validator: (value: any) => {
            if (this.data) {
              return [];
            }
            return this.http
              .get(`/api/sys/duplicate/check`, { fieldVal: value, tableName: 'sys_dict', fieldName: 'dict_code' })
              .pipe(map(res => (res.success ? [] : [{ keyword: 'required', message: '字典代码已存在' }])));
          }
        }
      },
      description: { type: 'string', title: '字典描述', maxLength: 140 }
    },
    required: ['dictName', 'dictCode']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 }
    },
    $dictCode: {},
    $description: {
      widget: 'textarea',
      autosize: { minRows: 3, maxRows: 6 }
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}
  ngOnInit(): void {
    console.log(this.data === undefined);
    if (this.schema.properties) {
      if (this.data === undefined) {
        this.schema.properties['dictCode']['readOnly'] = false;
      } else {
        this.schema.properties['dictCode']['readOnly'] = true;
      }
    }
  }

  save(value: any): void {
    if (this.data) {
      this.http.post(`/api/sys/dict/edit`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/api/sys/dict/add`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close(): void {
    this.modal.destroy();
  }
}
