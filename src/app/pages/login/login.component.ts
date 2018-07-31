import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: UsersService, private router: Router) { 
    
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log("entro1", this.loginForm);
      this.loginService.login('/users').subscribe((r: Array<any>)=>{
        console.log(r);
        let foundUser = null;
        foundUser = r.map(user => {
          if (user.username == this.email.value && user.password == this.password.value) {
            return user;
          }
        })[0];
        console.log(foundUser);
        if (foundUser) {
          localStorage.setItem('user', JSON.stringify(foundUser));
          this.router.navigate(['/list']);
        }
      });

    }
  };

}
