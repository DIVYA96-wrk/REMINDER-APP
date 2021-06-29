import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeventComponent } from './addevent/addevent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ShowhistoryComponent } from './showhistory/showhistory.component';

const routes: Routes = [
  {
    path: "", component: LoginpageComponent
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "register", component: RegisterpageComponent
  },
  {
    path: "addevent", component: AddeventComponent
  },
  {
    path: "showhistory", component: ShowhistoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
