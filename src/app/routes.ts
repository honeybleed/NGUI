import { ConfigCheckComponent } from './Views/config-check/config-check.component';
import { ConfigSetComponent } from './Views/config-set/config-set.component';
import { LoginWinComponent } from './Views/login-win/login-win.component';
import { VmsWinComponent } from './Views/vms-win/vms-win.component';
import { AppInfoComponent } from './Views/app-info/app-info.component';
import { Routes } from '@angular/router';
import { UiTestComponent } from './Views/ui-test/ui-test.component';
import { MutiTestComponent } from './Views/muti-test/muti-test.component';

export const routes: Routes = [
  {path: '', redirectTo: '/ui-test', pathMatch: 'full'},
  {path: 'config-check', component: ConfigCheckComponent},
  {path: 'config-set', component: ConfigSetComponent},
  {path: 'login-win', component: LoginWinComponent},
  {path: 'vms-win', component: VmsWinComponent},
  {path: 'app-info', component: AppInfoComponent},
  {path: 'ui-test', component: MutiTestComponent}
];
