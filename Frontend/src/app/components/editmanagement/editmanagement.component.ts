import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editmanagement',
  templateUrl: './editmanagement.component.html',
  styleUrls: ['./editmanagement.component.css']
})
export class EditmanagementComponent implements OnInit {
  public MANAGEMENTNAME = localStorage.getItem('MANAGEMENT_NAME')
  public email: string = ''
  public address: string = ''
  public phone: string = ''
  public password: string = ''
  public confirmpassword: string = ''

  constructor(public dialogRef: MatDialogRef<EditmanagementComponent>,
    private apiService: ApiService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.getmanagementdetail(localStorage.getItem('MANAGEMENT_NAME')).subscribe(result => {
      const userdata: any = result
      this.phone = userdata.managementdetail[0].phone
      this.email = userdata.managementdetail[0].email
      this.address = userdata.managementdetail[0].address
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
        username: this.MANAGEMENTNAME
      }
      this.apiService.updatemanagement(data).subscribe(result => {
        this.dialogRef.close()
      })
    }
    else if (this.password != '' && this.confirmpassword != '' && this.password == this.confirmpassword) {
      let data = {
        address: this.address,
        phone: this.phone,
        email: this.email,
        username: this.MANAGEMENTNAME,
        password: this.password
      }
      this.apiService.updatemanagementwithpassword(data).subscribe(result => {
        this.dialogRef.close()
      })
    } else {
      this.snackbar.open('Password not same', 'OK', {duration: 3000 });
    }
  }

}
