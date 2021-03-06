import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { APP_CONFIG, appConfig } from './config';
import { GalleryModule } from './gallery/gallery.module';
import { ManualModule } from './manual/manual.module';
import { PhotoModule } from './photo/photo.module';
import { metaReducers, reducers } from './reducers';
import { appRoutes } from './routes';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    ManualModule,
    AboutModule,
    UserModule.forRoot(),
    AuthModule.forRoot(),
    PhotoModule.forRoot(),
    GalleryModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
