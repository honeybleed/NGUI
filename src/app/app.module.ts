import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IconModule , TextInputModule} from './ui/index';
import { icons } from './icons';
import { ElecRelateModule } from './elec-relate';
import { ConfigCheckComponent } from './Views/config-check/config-check.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { UButtonModule } from './ui/u-button';

@NgModule({
  declarations: [
    AppComponent,
    ConfigCheckComponent,
  ],
  imports: [
    BrowserModule,
    IconModule.forRoot(icons),
    TextInputModule,
    UButtonModule,
    ElecRelateModule,
    RouterModule.forRoot(routes, { enableTracing: true , useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
