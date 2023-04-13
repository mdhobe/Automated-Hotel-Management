import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiService } from 'src/app/components/services/api.service'
@Component({
  selector: 'app-updatestock',
  templateUrl: './updatestock.component.html',
  styleUrls: ['./updatestock.component.css']
})
export class UpdatestockComponent implements OnInit {
  public name : string = ''
  public brand : string = ''
  public price : string = ''
  public weight : string = ''
  public quantityremain : string = ''
  public date : string = ''

  constructor(public dialogRef: MatDialogRef<UpdatestockComponent>,
    private apiservice : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { id : any}) { }

  ngOnInit(): void {
    this.apiservice.getstockdetails(this.data.id).subscribe(result =>{
      const stock : any = result
      this.name = stock.stocklist[0].itemname
      this.brand = stock.stocklist[0].brand
      this.price = stock.stocklist[0].price
      this.weight = stock.stocklist[0].weight
      this.quantityremain = stock.stocklist[0].quantityremain
      this.date = stock.stocklist[0].lastfilleddate
    })
  }

  updatestock():void{
    let data ={
      id : this.data.id,
      name : this.name,
      brand : this.brand,
      price : this.price,
      weight : this.weight,
      quantityremain : this.quantityremain,
      date : this.date
    }
    this.apiservice.putstock(data).subscribe(result=>{
      this.dialogRef.close()
      window.location.reload()
    })
  }

}
