import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  isAdmin : number = 0;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), this.nameHasSpaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }

  async onSubmit() {
    console.log('Entered onSubmit');
    if (this.signupForm.valid) {
      console.log('Entered signupForm');
      const { confirmPassword, ...userData } = this.signupForm.value;

      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      

      try {
        const response = await this.userService.createUser(formData).toPromise();
        console.log('User created successfully', response);

        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error creating user', error);
      }
    }
  }


  nameHasSpaceValidator(control: AbstractControl) {
    if (control.value && control.value.indexOf(' ') >= 0) {
      return null; 
    } else {
      return { nameRequiresSpace: true }; 
    }
  }

  
  passwordsMatchValidator(control: AbstractControl) {
    
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; 
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
