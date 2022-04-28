import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './Component/appC/app-routing.module';
import { AppComponent } from './Component/appC/app.component';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { UploadComponent } from './Component/upload/upload.component';
import { ImageComponent } from './Component/image/image.component';

//AIzaSyBb9zCapDcc5t0EvLGysVtm0c-oQCG7mz0

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UploadComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb9zCapDcc5t0EvLGysVtm0c-oQCG7mz0'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
