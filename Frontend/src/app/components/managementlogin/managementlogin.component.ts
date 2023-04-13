import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/components/services/api.service'
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-managementlogin',
  templateUrl: './managementlogin.component.html',
  styleUrls: ['./managementlogin.component.css']
})
export class ManagementloginComponent implements OnInit {
  public username : string = ''
  public password : string = ''
  
  constructor(private apiservice : ApiService,
    public router: Router,
    public dialogRef: MatDialogRef<ManagementloginComponent>,
    public snackbar : MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('MANAGEMENT_NAME') != null){
      this.router.navigate(['/management'])
      this.dialogRef.close()
    }
  }
  managementlogin(){
    let data = {
      username : this.username,
      password : this.password
    }
    this.apiservice.loginmanagement(data).subscribe(result =>{
      const user : any = result
      console.log("result",result)
      if(user.username != undefined){
        localStorage.setItem('MANAGEMENT_NAME', user.username);
        this.router.navigate(['/management'])
        this.dialogRef.close()
      }
      else{
        this.snackbar.open('INVALID CREDENTIALS', 'OK', {
          duration: 3000
        });
      }
    })
  }
}
