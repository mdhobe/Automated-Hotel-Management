import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editchef',
  templateUrl: './editchef.component.html',
  styleUrls: ['./editchef.component.css']
})
export class EditchefComponent implements OnInit {
  public CHEFNAME: any = localStorage.getItem('CHEFNAME')
  public email: string = ''
  public address: string = ''
  public phone: string = ''
  public password: string = ''
  public confirmpassword: string = ''

  constructor(private apiService: ApiService,
    public dialogRef: MatDialogRef<EditchefComponent>,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.getdetailsfromchefname(this.CHEFNAME).subscribe(result => {
      const detail: any = result
      this.address = detail.chefdetails[0].address
      this.phone = detail.chefdetails[0].phone
      this.email = detail.chefdetails[0].email
    })
  }

  close(): void {
    this.dialogRef.close()
  }

  update(): void {
    if (this.password == '' && this.confirmpassword == '') {
      let data = {
        address: this.address,
        phone: this.phone,
        email: this.email,
        chefname: this.CHEFNAME
      }
      this.apiService.updatechef(data).subscribe(result => {
        this.dialogRef.close()
      })
    }
    else if (this.password != '' && this.confirmpassword != '' && this.password == this.confirmpassword) {
      let data = {
        address: this.address,
        phone: this.phone,
        email: this.email,
        chefname: this.CHEFNAME,
        password: this.password
      }
      this.apiService.updatechefwithpassword(data).subscribe(result => {
        this.dialogRef.close()
      })
    } else {
      this.snackbar.open('Password not same', 'OK', {duration: 3000 });
    }
  }

}
