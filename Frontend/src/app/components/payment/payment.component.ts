import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiService } from 'src/app/components/services/api.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PaymentComponent>,
    private apiservice : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { total : any, orderlist : any }) { }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  pay(){
    let bills : Array<any> = []
    let orders : Array<any> = []
    let total : number = 0
    for(let order of this.data.orderlist){
      orders.push(order.order)
      bills.push(order.billnumber)
      total += parseInt(order.total)
    }
    const currentDate = new Date()
    const datetimestamp = currentDate.getTime()
    this.apiservice.updateorderstatuspaidcombined({ bills : bills, orders : orders, total : total, newbill : datetimestamp}).subscribe(result =>{
      this.apiservice.generatedcompletebill(datetimestamp).subscribe(results=>{
      })
      this.dialogRef.close();
    })
  }
}
