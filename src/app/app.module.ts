import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

/* import new Module component ... */

import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { ShareDirectiveModule } from "./directives/share-directive.module";
import { Camera } from '@ionic-native/Camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import {NgCalendarModule} from 'ionic2-calendar'
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("access_token");

    },
    whitelistedDomains: ["192.168.1.235:3000"]
    // whitelistedDomains: ["192.168.1.123:3000"]
  };
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    ShareDirectiveModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    AppRoutingModule,
    NgCalendarModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    ActionSheet,
    WheelSelector,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
