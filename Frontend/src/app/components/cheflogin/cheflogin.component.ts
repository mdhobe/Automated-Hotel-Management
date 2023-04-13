import { Component, OnInit } from '@angular/core';
import { ChefloginService } from '../services/cheflogin.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cheflogin',
  templateUrl: './cheflogin.component.html',
  styleUrls: ['./cheflogin.component.css']
})
export class ChefloginComponent implements OnInit {

  constructor(private chefloginService: ChefloginService,
    private router: Router,
    public dialogRef: MatDialogRef<ChefloginComponent>,private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  cheflogin(chefinfo : any){
    let data={
      username: chefinfo.chefusername,
      password: chefinfo.chefpassword
    }
    this.chefloginService.login(data).subscribe(success => {
        console.log("success=",success)
        if (success) {
          this.dialogRef.close()
          this.router.navigate(['/chef']);
        }
        else{
          this.snackbar.open('INVALID CREDENTIALS', 'OK', {
            duration: 3000
          });
        }
      });
  }
}
