import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload !: SignupRequestPayload;
  constructor(private router: Router,private authService: AuthService) {
    this.signupRequestPayload={
      username:"",
      email:"",
      password:"",
    }
   }

  signupForm!: FormGroup;


  ngOnInit(): void  {
    this.signupForm =new FormGroup({
         username : new FormControl('',Validators.required),
         email: new FormControl('',[Validators.required,Validators.email]),
         password: new FormControl('',Validators.required)
    })

  }
  signup(){
    this.signupRequestPayload.email=this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, error => {
        console.log("Registration Error "+error);
        
      });
  }

}
