import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChefloginComponent } from 'src/app/components/cheflogin/cheflogin.component';
import { ManagementloginComponent } from 'src/app/components/managementlogin/managementlogin.component';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  public hotelname : string = 'HOTEL NAME'
  public tablenumber = Math.floor(Math.random()*(100000-10000)+10000)

  constructor(public authService: AuthService,
    public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hotelname = this.authService.gethotelname()
  }

  logout(): void {
    localStorage.removeItem('CUSOMERNAME')
    localStorage.removeItem('MOBILE')
    localStorage.removeItem('EMAIL')
    localStorage.removeItem('TABLENUMBER')
    localStorage.removeItem('CHEF_TOKEN')
    localStorage.removeItem('MANAGEMENT_NAME')
    localStorage.removeItem('CHEFNAME')
    this.authService.logout()
      .subscribe(( success: any )  => {
        if (success) {
          this.router.navigate(['/hotel-login']);
        }
      });
  }

  storeuserinfo(userdetails : any){
    localStorage.setItem('CUSOMERNAME', userdetails['customername']);
    localStorage.setItem('MOBILE', userdetails['mobilenumber']);
    localStorage.setItem('EMAIL', userdetails['email']);
    localStorage.setItem('TABLENUMBER', userdetails['tablenumber']);
  }

  order(userdetails:any){
    this.storeuserinfo(userdetails)
    this.router.navigate(['/place-order']);
  }

  managementlogin(){
    const managementlogin = this.dialog.open(ManagementloginComponent, { width: '400px', height: '450px' });
  }

  cheflogin(){
    if(localStorage.getItem('CHEF_TOKEN') == null){
      const cheflogin = this.dialog.open(ChefloginComponent, { width: '400px', height: '450px' });
    }
    else{
      this.router.navigate(['/chef'])
    }
    
  }

}
