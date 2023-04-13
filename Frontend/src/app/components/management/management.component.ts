import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OrderComponent } from 'src/app/components/order/order.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditmanagementComponent } from 'src/app/components/editmanagement/editmanagement.component';
import { UpdatestockComponent } from 'src/app/components/updatestock/updatestock.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public orderlist: any = []
  public cheflist: any = []
  public managementlist: any = []
  public stock: any = []

  //profile
  public name: string = ''
  public title: string = ''
  public phone: string = ''
  public date: string = ''
  public email: string = ''
  public username : any = ''
  public address: string = ''

  //data of chef
  public nameofchef: string = ''
  public usernameofchef: string = ''
  public titleofchef: string = ''
  public phonrofchef: string = ''
  public emailofchef: string = ''
  public dateofjoiningofchef: string = ''
  public addressofchef: string = ''

  //data of management
  public nameofmanagement: string = ''
  public usernameofmanagement: string = ''
  public titleofmanagement: string = ''
  public phonrofmanagement: string = ''
  public emailofmanagement: string = ''
  public dateofjoiningofmanagement: string = ''
  public addressofmanagement: string = ''

  //stock
  public namestock: string = ''
  public brandstock: string = ''
  public pricestock: string = ''
  public quantitystock: string = ''
  public refilldate: string = ''

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    public router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem('MANAGEMENT_NAME') == null) {
      this.router.navigate(['/mainpage'])
    }
    else {
      this.apiService.getmanagementdetail(localStorage.getItem('MANAGEMENT_NAME')).subscribe(result => {
        const userdata: any = result
        this.name = userdata.managementdetail[0].authorityname
        this.title = userdata.managementdetail[0].title
        this.phone = userdata.managementdetail[0].phone
        this.date = userdata.managementdetail[0].dateofjoining
        this.email = userdata.managementdetail[0].email
        this.address = userdata.managementdetail[0].address
        this.username = localStorage.getItem('MANAGEMENT_NAME')
      })
      this.apiService.getallinfo().subscribe(result => {
        this.orderlist = result
      })
      this.apiService.getallchef().subscribe(result => {
        this.cheflist = result
      })
      this.apiService.getallmanagement().subscribe(result => {
        this.managementlist = result
      })
      this.apiService.getallstock().subscribe(result => {
        this.stock = result
      })
    }
  }

  order(order: any, price: string) {
    const orderopen = this.dialog.open(OrderComponent, { width: '500px', height: '400px', data: { order: order, price: price } });
    orderopen.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  addchef() {
    if (this.nameofchef != '' && this.usernameofchef != '' && this.titleofchef != '' && this.phonrofchef != '' && this.emailofchef != '' && this.dateofjoiningofchef != '' && this.addressofchef != '') {
      let data = {
        name: this.nameofchef,
        username: this.usernameofchef,
        title: this.titleofchef,
        phone: this.phonrofchef,
        email: this.emailofchef,
        dateofjoining: this.datetodate(this.dateofjoiningofchef),
        address: this.addressofchef
      }
      this.apiService.addchef(data).subscribe(result => {
        this.nameofchef = ''
        this.usernameofchef = ''
        this.titleofchef = ''
        this.phonrofchef = ''
        this.emailofchef = ''
        this.dateofjoiningofchef = ''
        this.addressofchef = ''
        this.snackbar.open('ADDED SUCCESSFULLY', 'OK', { duration: 3000 });
      })
    }
    else {
      this.snackbar.open('Fill all field in CHEF', 'OK', { duration: 3000 });
    }
  }

  addmanagement() {
    if (this.nameofmanagement != '' && this.usernameofmanagement != '' && this.titleofmanagement != '' && this.phonrofmanagement != '' && this.emailofmanagement != '' && this.dateofjoiningofmanagement != '' && this.addressofmanagement != '') {
      let data = {
        name: this.nameofmanagement,
        username: this.usernameofmanagement,
        title: this.titleofmanagement,
        phone: this.phonrofmanagement,
        email: this.emailofmanagement,
        dateofjoining: this.datetodate(this.dateofjoiningofmanagement),
        address: this.addressofmanagement
      }
      this.apiService.addmanagement(data).subscribe(result => {
        this.nameofmanagement = ''
        this.usernameofmanagement = ''
        this.titleofmanagement = ''
        this.phonrofmanagement = ''
        this.emailofmanagement = ''
        this.dateofjoiningofmanagement = ''
        this.addressofmanagement = ''
        this.snackbar.open('ADDED SUCCESSFULLY', 'OK', { duration: 3000 });
      })
    }
    else {
      this.snackbar.open('Fill all field in MANAGEMENT', 'OK', { duration: 3000 });
    }
  }

  addstock() {
    if (this.namestock != '' && this.brandstock != '' && this.pricestock != '' && this.quantitystock != '' && this.refilldate != '') {
      let data = {
        name: this.namestock,
        brand: this.brandstock,
        price: this.pricestock,
        quantity: this.quantitystock,
        refilldate: this.datetodate(this.refilldate)
      }
      this.apiService.addstock(data).subscribe(result => {
        this.namestock = ''
        this.brandstock = ''
        this.pricestock = ''
        this.quantitystock = ''
        this.refilldate = ''
        this.snackbar.open('ADDED SUCCESSFULLY', 'OK', { duration: 3000 });
      })
    }
    else {
      this.snackbar.open('Fill all field in STOCK', 'OK', { duration: 3000 });
    }
  }

  datetodate(date: string) {
    let dates = date.charAt(8) + date.charAt(8) + '-' + date.charAt(5) + date.charAt(6) + '-' + date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3)
    return dates
  }

  logout(){
    localStorage.removeItem('MANAGEMENT_NAME');
    this.router.navigate(['/mainpage'])
  }

  edit(){
    const editprofile = this.dialog.open(EditmanagementComponent, { width: '500px', height: '400px' });
    editprofile.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }

  updatestock(id : number){
    const updatestock = this.dialog.open(UpdatestockComponent, { width: '500px', height: '400px', data: { id: id} });
    updatestock.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

}
