import { Component, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
  appTitle: string | undefined = '系统登录';
  links = [
    {
      title: '帮助',
      href: ''
    },
    {
      title: '隐私',
      href: ''
    },
    {
      title: '条款',
      href: ''
    }
  ];

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private settings: SettingsService) {
    this.appTitle = this.settings.app.name;
  }

  ngOnInit(): void {
    this.tokenService.clear();
  }
}
