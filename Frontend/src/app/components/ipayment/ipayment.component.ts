import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiService } from 'src/app/components/services/api.service'

@Component({
  selector: 'app-ipayment',
  templateUrl: './ipayment.component.html',
  styleUrls: ['./ipayment.component.css']
})
export class IpaymentComponent {
  
  constructor(public dialogRef: MatDialogRef<IpaymentComponent>,
    private apiservice : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { total : any, billnumber: any }) { }

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
    this.apiservice.updateorderstatuspaid(this.data.billnumber).subscribe(result =>{
      this.apiservice.generatedsinglebill(this.data.billnumber).subscribe(results =>{
        console.log(results)
      })
      this.dialogRef.close()
    })
  }
}
