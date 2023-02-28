import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { TokenService } from '@delon/auth';
import { CacheService } from '@delon/cache';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, zip, catchError, map } from 'rxjs';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private cacheService: CacheService,
    private injector: Injector,
    private notification: NzNotificationService,
    private router: Router
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }
  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  load(): Observable<void> {
    // this.cacheService.set
    this.httpClient.get('/api/sys/dict/queryAllDictItems').subscribe((res: any) => {
      if (res.success) {
        Object.keys(res.result).forEach((value: string, index: number, array: string[]) => {
          this.cacheService.set(value, res.result[value]);
        });
      } else {
        if (res.status === 401) {
          this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
          this.goTo('/passport/login');
          // setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        }
      }
    });
    const defaultLang = this.i18n.defaultLang;
    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('assets/tmp/app-data.json')).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(res => {
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));

        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        // setting language data
        this.i18n.use(defaultLang, langData);

        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(appData.app);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 初始化菜单
        this.menuService.add(appData.menu);
        // 设置页面标题的后缀
        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }
}
