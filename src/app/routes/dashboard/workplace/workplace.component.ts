import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { User, _HttpClient, SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { zip } from 'rxjs';

@Component({
  selector: 'app-dashboard-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWorkplaceComponent implements OnInit {
  notice: any[] = [];
  activities: any[] = [];
  radarData!: any[];
  loading = true;
  welcomeMsg: string | undefined = '';

  // region: mock data
  links = [
    {
      title: '操作一',
      href: ''
    },
    {
      title: '操作二',
      href: ''
    },
    {
      title: '操作三',
      href: ''
    },
    {
      title: '操作四',
      href: ''
    },
    {
      title: '操作五',
      href: ''
    },
    {
      title: '操作六',
      href: ''
    }
  ];
  members = [
    {
      id: 'members-1',
      title: '科学搬砖组',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      link: ''
    },
    {
      id: 'members-2',
      title: '程序员日常',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      link: ''
    },
    {
      id: 'members-3',
      title: '设计天团',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      link: ''
    },
    {
      id: 'members-4',
      title: '中二少女团',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      link: ''
    },
    {
      id: 'members-5',
      title: '骗你学计算机',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      link: ''
    }
  ];
  get appName(): any {
    return this.settings.app.name;
  }
  // endregion

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {}

  get user(): User {
    return this.settings.user;
  }

  ngOnInit(): void {
    this.welcomeMsg = `${this.settings.user.name}，`;
    let today = new Date();
    let hour = new Date().getHours();
    if (hour < 6) this.welcomeMsg += '凌晨好！';
    else if (hour < 9) this.welcomeMsg += '早上好！';
    else if (hour < 12) this.welcomeMsg += '上午好！';
    else if (hour < 14) this.welcomeMsg += '中午好！';
    else if (hour < 17) this.welcomeMsg += '下午好！';
    else if (hour < 19) this.welcomeMsg += '傍晚好！';
    else if (hour < 22) this.welcomeMsg += '晚上好！';
    else {
      this.welcomeMsg += '晚上好！';
    }
    zip(this.http.get('/chart'), this.http.get('/api/notice'), this.http.get('/api/activities')).subscribe(
      ([chart, notice, activities]: [any, any, any]) => {
        this.radarData = chart.radarData;
        this.notice = notice;
        this.activities = activities.map((item: any) => {
          item.template = item.template.split(/@\{([^{}]*)\}/gi).map((key: string) => {
            if (item[key]) {
              return `<a>${item[key].name}</a>`;
            }
            return key;
          });
          return item;
        });
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
