import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router } from '@angular/router';
import { EditchefComponent } from 'src/app/components/editchef/editchef.component';
import { MatDialog } from '@angular/material/dialog';

class Item {
  items !: any;
  billnumber !: any;
}
class Order {
  billnumber !: string;
  total !: any;
  datestamp !: any;
}
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  public username: string = ''
  public email: string = ''
  public address: string = ''
  public cheftitle: string = ''
  public dateofjoining: string = ''
  public phone: string = ''
  orders = new Order()
  items = new Item()
  public CHEFNAME: any = localStorage.getItem('CHEFNAME')
  public orderlist: Array<any> = []
  public orderhistory: Array<any> = []
  isChecked: Array<boolean> = [];

  constructor(private apiService: ApiService, public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('CHEFNAME') == null) {
      this.router.navigate(['/mainpage'])
    }
    else {
      this.apiService.getdetailsfromchefname(this.CHEFNAME).subscribe(result => {
        const detail: any = result
        this.address = detail.chefdetails[0].address
        this.cheftitle = detail.chefdetails[0].cheftitle
        this.dateofjoining = detail.chefdetails[0].dateofjoining
        this.phone = detail.chefdetails[0].phone
        this.email = detail.chefdetails[0].email
        this.username = detail.chefdetails[0].username
      })
      this.apiService.getordercheflist(this.CHEFNAME).subscribe(result => {
        const order: any = result
        for (let orderitem of order.orderlist) {
          if (orderitem.status == "cooking") {
            this.items = new Item()
            this.items.items = orderitem
            this.items.billnumber = orderitem.billnumber
            this.isChecked.push(false)
            this.orderlist.push(this.items)
          }
        }
      })
      this.apiService.getchefhistorylist(this.CHEFNAME).subscribe(result => {
        const order: any = result
        for (let orderitem of order.orderlist) {
          if (orderitem.status == "paid") {
            this.orders = new Order()
            let billnum: string = ''
            for (let i = 0; i < orderitem.billnumber.length; i++) {
              if (i < 6) {
                billnum += 'X'
              }
              else {
                let c = orderitem.billnumber.charAt(i)
                billnum += c
              }
            }
            this.orders.datestamp = orderitem.billnumber
            this.orders.billnumber = billnum
            this.orders.total = orderitem.total
            this.orderhistory.push(this.orders)
          }
        }
      })
    }
  }

  removeuser() {
    localStorage.removeItem('CHEF_TOKEN');
    localStorage.removeItem('CHEF_R_TOKEN');
    localStorage.removeItem('CHEFNAME');
    this.router.navigate(['/mainpage']);
  }

  statuscooked(i: number, billnumber: any) {
    if (this.isChecked[i] == false) {
      this.apiService.updateorderstatuschef(billnumber).subscribe(result => {
        console.log(result)
      })
    }
    window.location.reload();
  }

  edit() {
    const editprofile = this.dialog.open(EditchefComponent, { width: '500px', height: '400px' });
    editprofile.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }

}
