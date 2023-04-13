import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

class CartFood{
  name !: string;
  category !: string;
  price !: number;
  quantity !: number;
  total !: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartfood = new CartFood()
  public cartItem : Array<any> = []
  public total : number = 0
  constructor(public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { foodlist: any }) { }

  ngOnInit(): void {
    this.cart()
  }

  cart(){
    this.cartItem = []
    for(let item of this.data.foodlist){
      if(item.quantity > 0){
        this.cartfood = new CartFood()
        this.cartfood.name = item.name
        this.cartfood.category = item.category
        this.cartfood.price = item.price
        this.cartfood.quantity = item.quantity
        this.cartfood.total = item.price*item.quantity
        this.total += item.price*item.quantity
        this.cartItem.push(this.cartfood) 
      }
    }
  }

  add(i : number){
    this.cartItem[i].quantity +=  1
    this.updatetotal()
  }

  sub(i : number){
    if((this.cartItem[i].quantity-1)>0){
      this.cartItem[i].quantity -= 1
      this.updatetotal()
    }
   
  }

  updatetotal(){
    this.total = 0
    for(let item of this.cartItem){
      this.total += item.price*item.quantity
    }
  }

  placeorder(){
    this.dialogRef.close({ cartlist : this.cartItem, total : this.total})
  }
}
