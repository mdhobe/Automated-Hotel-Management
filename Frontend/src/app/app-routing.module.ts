import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthGuard } from './components/guards/auth.guard';
import { CustomerGuard } from './components/guards/customer.guard';
import { CustomerComponent } from './components/customer/customer.component';
import { ChefComponent } from './components/chef/chef.component';
import { ManagementComponent } from './components/management/management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/hotel-login' },
  { path: 'hotel-login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'mainpage', component: MainpageComponent},
  { path: 'place-order', component: CustomerComponent},
  { path: 'chef', component: ChefComponent},
  { path: 'management', component: ManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
