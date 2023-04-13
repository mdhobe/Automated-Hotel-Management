import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ChefloginComponent } from './components/cheflogin/cheflogin.component';
import { ManagementloginComponent } from './components/managementlogin/managementlogin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CartComponent } from './components/cart/cart.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ChefComponent } from './components/chef/chef.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ManagementComponent } from './components/management/management.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { IpaymentComponent } from './components/ipayment/ipayment.component';
import { EditchefComponent } from './components/editchef/editchef.component';
import { EditmanagementComponent } from './components/editmanagement/editmanagement.component';
import { UpdatestockComponent } from './components/updatestock/updatestock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpageComponent,
    ChefloginComponent,
    ManagementloginComponent,
    CustomerComponent,
    CartComponent,
    EditprofileComponent,
    ChefComponent,
    ManagementComponent,
    OrderComponent,
    PaymentComponent,
    IpaymentComponent,
    EditchefComponent,
    EditmanagementComponent,
    UpdatestockComponent
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatDividerModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
