import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private api:ApiService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
  }
  token:any = null;
  hide = true;
  panelOpenState = false;
  error:any = null;
  loginForm = this.fb.group({
    email:this.fb.control('',[Validators.required, Validators.email]),
    password : this.fb.control('',Validators.required)
  })
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'email required';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }


  loginSubmit(data:any){
    this.token = null;
    if(this.loginForm.valid){
      // console.log(data.value);
      this.api.loginValidation(data.value).subscribe({
        
        next: da => {this.token = da.token;
        this.router.navigate(['/medicine'])
        },
        error: er => this.error = er,
        complete: () => {this.loginForm.reset();}
      })
      
    }
  }




}
