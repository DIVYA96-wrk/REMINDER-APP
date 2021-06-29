import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { AddeventComponent } from './addevent/addevent.component';
import { ShowhistoryComponent } from './showhistory/showhistory.component';
import { SafePipe } from './safe.pipe';
import { UpdatepageComponent } from './updatepage/updatepage.component';
import {DragDropModule} from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [

    AppComponent,
    LoginpageComponent,
    DashboardComponent,
    RegisterpageComponent,
    AddeventComponent,
    ShowhistoryComponent,
    SafePipe,
    UpdatepageComponent
  ],
  imports: [
    DragDropModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
