import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { CartComponent } from 'src/app/components/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditprofileComponent } from 'src/app/components/editprofile/editprofile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { IpaymentComponent } from 'src/app/components/ipayment/ipayment.component';

class Food {
  name !: string;
  description !: string;
  category !: string;
  price !: number;
  quantity !: number;
}
class Order {
  billnumber !: number;
  customername !: string;
  mobile !: string;
  email !: string;
  chefid !: number;
  chefname !: string;
  order !: any;
  tablenumber !: string;
  total !: number;
  status !: string;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  dishes = new Food()
  order = new Order()

  public fooditem: Array<any> = []
  public isorderplaced = true
  public orderlist: Array<any> = []
  public chef: Array<any> = []

  public NAME: any = localStorage.getItem('CUSOMERNAME')
  public MOBILE: any = localStorage.getItem('MOBILE')
  public EMAIL: any = localStorage.getItem('EMAIL')
  public TABLE: any = localStorage.getItem('TABLENUMBER')

  controlLogout:boolean =false;

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    public router: Router,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.controlLogout=false;
    if (localStorage.getItem('CUSOMERNAME') == null) {
      this.router.navigate(['/mainpage'])
    }
    else {
      this.apiService.getfoodlist().subscribe(result => {
        const foodlist: any = result
        for (var item of foodlist.foodlist) {
          this.controlLogout=true;
          if (item.category == 'Starters') {
            this.dishes = new Food()
            this.dishes.name = item.name
            this.dishes.description = item.description
            this.dishes.category = item.category
            this.dishes.price = item.price
            this.dishes.quantity = 0
            this.fooditem.push(this.dishes)
          }
        }
        for (var item of foodlist.foodlist) {
          if (item.category == 'Main Course') {
            this.dishes = new Food()
            this.dishes.name = item.name
            this.dishes.description = item.description
            this.dishes.category = item.category
            this.dishes.price = item.price
            this.dishes.quantity = 0
            this.fooditem.push(this.dishes)
          }
        }
        for (var item of foodlist.foodlist) {
          if (item.category == 'Biryanis') {
            this.dishes = new Food()
            this.dishes.name = item.name
            this.dishes.description = item.description
            this.dishes.category = item.category
            this.dishes.price = item.price
            this.dishes.quantity = 0
            this.fooditem.push(this.dishes)
          }
        }
        for (var item of foodlist.foodlist) {
          if (item.category == 'Roti') {
            this.dishes = new Food()
            this.dishes.name = item.name
            this.dishes.description = item.description
            this.dishes.category = item.category
            this.dishes.price = item.price
            this.dishes.quantity = 0
            this.fooditem.push(this.dishes)
          }
        }
        for (var item of foodlist.foodlist) {
          if (item.category == 'Dessert') {
            this.dishes = new Food()
            this.dishes.name = item.name
            this.dishes.description = item.description
            this.dishes.category = item.category
            this.dishes.price = item.price
            this.dishes.quantity = 0
            this.fooditem.push(this.dishes)
          }
        }
      })
      this.apiService.getcheflist().subscribe(result => {
        const chefname: any = result
        for (let name of chefname['cheflist']) {
          if (name['available'] == 'true') {
            this.chef.push({ name: name['chefname'], chefid: name['uuid'] })
          }
        }
        // console.log(this.chef)
      })
      this.apiService.getallcurrentorder(this.MOBILE).subscribe(result => {
        const item: any = result
        if (item.data.length > 0) {
          this.isorderplaced = false
          for (let element of item.data) {
            this.controlLogout=true;
            this.order = new Order()
            this.order.billnumber = element.billnumber
            this.order.order = element.orderlist.order
            this.order.total = element.total
            this.order.status = element.status
            this.orderlist.push(this.order)
          }
        }
        else{
          this.controlLogout=false;
        }
      })
    }
  }

  removeuser() {
    localStorage.removeItem('CUSOMERNAME');
    localStorage.removeItem('MOBILE');
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('TABLENUMBER');
    this.router.navigate(['/mainpage']);
  }

  editProfile() {
    const editprofile = this.dialog.open(EditprofileComponent, { width: '500px', height: '300px' });
    editprofile.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }

  addToCart() {
    let iscartempty: boolean = true
    for (let item of this.fooditem) {
      if (item.quantity > 0) {
        iscartempty = false
      }
    }
    if (iscartempty) {
      this.snackbar.open('Please ADD Item', 'OK', {
        duration: 3000
      });
    }
    else {
      const cartfood = this.dialog.open(CartComponent, { width: '500px', height: '400px', data: { foodlist: this.fooditem } });
      cartfood.afterClosed().subscribe(result => {
        const cartitems: any = result
        const currentDate = new Date()
        const datetimestamp = currentDate.getTime()
        this.order = new Order()
        this.order.billnumber = datetimestamp
        this.order.customername = this.NAME
        this.order.mobile = this.MOBILE
        this.order.email = this.EMAIL
        const chefdetail: any = this.chef[Math.floor(Math.random() * this.chef.length)]
        this.order.chefname = chefdetail.name
        this.order.order = cartitems.cartlist
        this.order.total = cartitems.total
        this.order.tablenumber = this.TABLE
        this.order.chefid = chefdetail.chefid
        this.orderlist.push(this.order)
        this.isorderplaced = false
        this.apiService.saveorder(this.order).subscribe(result => {
          for (var item of this.fooditem) {
            this.controlLogout=true;
            item.quantity = 0
            window.location.reload()
           
          }
        })
      })
    }
  }

  add(i: number) {
    this.fooditem[i].quantity += 1
  }

  sub(i: number) {
    this.fooditem[i].quantity -= 1
  }

  pay() {
    let total_cost: number = 0
    for (let orders of this.orderlist) {
      total_cost += parseInt(orders.total)
    }
    const payment = this.dialog.open(PaymentComponent, { width: '400px', height: '500px', data: { total: total_cost, orderlist: this.orderlist } });
    payment.afterClosed().subscribe(result => {
      this.controlLogout=false;
      this.removeuser()
    })
  }

  payinvidual(order: any) {
    const payment = this.dialog.open(IpaymentComponent, { width: '400px', height: '500px', data: { total: order.total, billnumber: order.billnumber } });
    payment.afterClosed().subscribe(result => {
      if (this.orderlist.length == 1 || this.orderlist.length == 0) {
        this.controlLogout=false;
        this.removeuser()
      }
      window.location.reload()
    })
  }

}
