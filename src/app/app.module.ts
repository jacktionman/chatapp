import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import { AppComponent } from './app.component';
import { MasterComponent } from './component/master.component';
import { SlaveAComponent } from './component/slavea.component';
import { SlaveBComponent } from './component/slaveb.component';


@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    SlaveAComponent,
    SlaveBComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
    {path: 'master', component: MasterComponent},
    {path: 'slavea', component: SlaveAComponent},
    {path: 'slaveb', component: SlaveBComponent}
    ]),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
