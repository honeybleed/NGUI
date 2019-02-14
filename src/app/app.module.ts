import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IconModule , TextInputModule} from './ui/index';
import { iconConfig } from './icons';
import { ElecRelateModule } from './elec-relate';
import { ConfigCheckComponent } from './Views/config-check/config-check.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { UButtonModule } from './ui/u-button';
import { AppMsgComponent } from './Components/app-msg/app-msg.component';
import { ConfigSetComponent } from './Views/config-set/config-set.component';
import { LoginWinComponent } from './Views/login-win/login-win.component';
import { VmsWinComponent } from './Views/vms-win/vms-win.component';
import { VmItemComponent } from './Components/vm-item/vm-item.component';
import { AppInfoComponent } from './Views/app-info/app-info.component';
import { UiTestComponent } from './Views/ui-test/ui-test.component';
import { DropListModule } from './ui/drop-list';
import { MutiTestComponent } from './Views/muti-test/muti-test.component';
import { PopupLayerComponent } from './Components/popup-layer/popup-layer.component';
import { RunVmMessageBoxComponent } from './Views/messagg-box/run-vm-message-box/run-vm-message-box.component';
import { PopupLayerService } from './Components/popup-layer/popup-layer.service';
import { RerunVmMessageBoxComponent } from './Views/messagg-box/rerun-vm-message-box/rerun-vm-message-box.component';
import { StopVmMessageBoxComponent } from './Views/messagg-box/stop-vm-message-box/stop-vm-message-box.component';
import { ErrorMessageBoxComponent } from './Views/messagg-box/error-message-box/error-message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigCheckComponent,
    AppMsgComponent,
    ConfigSetComponent,
    LoginWinComponent,
    VmsWinComponent,
    VmItemComponent,
    AppInfoComponent,
    UiTestComponent,
    MutiTestComponent,
    PopupLayerComponent,
    RunVmMessageBoxComponent,
    RerunVmMessageBoxComponent,
    StopVmMessageBoxComponent,
    ErrorMessageBoxComponent,
  ],
  imports: [
    BrowserModule,
    IconModule.forRoot(iconConfig),
    TextInputModule,
    UButtonModule,
    DropListModule,
    ElecRelateModule,
    RouterModule.forRoot(routes, { enableTracing: true , useHash: true})
  ],
  providers: [PopupLayerService],
  entryComponents: [RunVmMessageBoxComponent, RerunVmMessageBoxComponent, StopVmMessageBoxComponent, ErrorMessageBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
