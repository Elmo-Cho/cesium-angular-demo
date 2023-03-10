/* eslint-disable prettier/prettier */
import { Component, TemplateRef, ViewChild, OnInit, ViewChildren, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultComponent, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default #layoutDefault [options]="options"  [content]="contentTpl" [customError]="null" >
      
      <!-- <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//github.com/ng-alain/ng-alain" target="_blank">
          <i nz-icon nzType="github"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="left" hidden="mobile">
        <a layout-default-header-item-trigger routerLink="/passport/lock">
          <i nz-icon nzType="lock"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="left" hidden="pc">
        <div layout-default-header-item-trigger (click)="searchToggleStatus = !searchToggleStatus">
          <i nz-icon nzType="search"></i>
        </div>
      </layout-default-header-item> -->
      <!-- <layout-default-header-item direction="middle">
        <header-search class="alain-default__search" [(toggleChange)]="searchToggleStatus"></header-search>
      </layout-default-header-item> -->
      <!-- <layout-default-header-item direction="right">
        <header-notify></header-notify>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <header-task></header-task>
      </layout-default-header-item> -->
      <layout-default-header-item direction="right" hidden="mobile">
        <header-icon></header-icon>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <div layout-default-header-item-trigger nz-dropdown [nzDropdownMenu]="settingsMenu" nzTrigger="click" nzPlacement="bottomRight">
          <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingsMenu="nzDropdownMenu">
          <div nz-menu style="width: 200px;">
            <div nz-menu-item>
              <header-rtl></header-rtl>
            </div>
            <div nz-menu-item>
              <header-fullscreen></header-fullscreen>
            </div>
            <div nz-menu-item>
              <header-clear-storage></header-clear-storage>
            </div>
            <div nz-menu-item>
              <header-i18n></header-i18n>
            </div>
          </div>
        </nz-dropdown-menu>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <header-user></header-user>
      </layout-default-header-item>
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
          <nz-avatar class="alain-default__aside-user-avatar" [nzSrc]="user.avatar"></nz-avatar>
          <div class="alain-default__aside-user-info">
            <strong>{{ user.name }}</strong>
            <p class="mb0">{{ user.email }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/pro/account/center">{{ 'menu.account.center' | i18n }}</li>
            <li nz-menu-item routerLink="/pro/account/settings">{{ 'menu.account.settings' | i18n }}</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <ng-template #contentTpl>
        <router-outlet></router-outlet>
      </ng-template>
      <ng-template #logoTemplateRef>
        <h1 class="text-white logo-title-font" style="width:800px;">{{appName}}</h1>
      </ng-template>
    </layout-default>

    <setting-drawer *ngIf="showSettingDrawer"></setting-drawer>
    <!-- <theme-btn></theme-btn> -->
    
  `,
  styleUrls: ['./basic.component.less'],
})
export class LayoutBasicComponent implements AfterViewInit {

  @ViewChild('logoTemplateRef')
  logoTemplateRef!: TemplateRef<NzSafeAny>;
  @ViewChild('layoutDefault')
  layoutDefault!: LayoutDefaultComponent;

  options: LayoutDefaultOptions = {
    showHeaderCollapse: false,
    showSiderCollapse: true,
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }
  get appName(): any {
    return this.settings.app.name;
  }

  constructor(private settings: SettingsService) {

  }
  ngAfterViewInit(): void {
    console.log();
    this.options.logo = this.logoTemplateRef;
    this.layoutDefault.options = this.options;
  }

}
