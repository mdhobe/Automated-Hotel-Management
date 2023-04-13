import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['rajastanroyal'],
      password: ['rajastanroyal']
    });
  }

  get control(): any { return this.loginForm.controls; }

  login(): void {
    this.authService.login(
      {
        username: this.control.username.value,
        password: this.control.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/mainpage']);
        }
      });
  }

}
