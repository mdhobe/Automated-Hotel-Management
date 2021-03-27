import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';
import { DashboardGuard } from './components/guards/dashboard.guard';
import { HotelloginComponent } from './components/hotellogin/hotellogin.component';
import { SignupGuard } from './components/guards/signup.guard';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ChefComponent } from './components/chef/chef.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo : '/hotellogin'},
  {path:'hotellogin', component : HotelloginComponent},
  {path:'mainpage',component : MainpageComponent},
  {path:'chef',component : ChefComponent},
  {path:'customer',component : CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
