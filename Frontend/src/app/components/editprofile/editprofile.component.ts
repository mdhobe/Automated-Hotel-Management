import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  public name : any = 'Mrunal Dhobe';
  public moblie : any = 9834347259;
  public email : any = 'mrunaldhobe16@gmail.com';
  public table : any = 95989;

  constructor(public dialogRef: MatDialogRef<EditprofileComponent>) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('CUSOMERNAME')
    this.moblie = localStorage.getItem('MOBILE')
    this.email = localStorage.getItem('EMAIL')
    this.table = localStorage.getItem('TABLENUMBER')
  }

  update() : void{
    localStorage.setItem('CUSOMERNAME', this.name);
    localStorage.setItem('MOBILE', this.moblie);
    localStorage.setItem('EMAIL', this.email);
    localStorage.setItem('TABLENUMBER', this.table);
    this.dialogRef.close()
  }

  close(): void{
    this.dialogRef.close()
  }

}
