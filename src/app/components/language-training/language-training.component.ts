import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { LanguageTrainingService } from 'src/app/services/language-training.service';

@Component({
  selector: 'app-language-training',
  templateUrl: './language-training.component.html',
  styleUrls: ['./language-training.component.css']
})
export class LanguageTrainingComponent {

  selectedProduct!: string;
  options: string[] = ['English', 'Romanian', 'French', 'German', 'Italian', 'Spanish'];
  profOptions: string[] = ['A1 - 4 months','A2 - 6 months','B1 - 8 months','B2 - 10 months','C1 - 12 months','C2 - 15 months']
  form: FormGroup;
  formSubmitted = false; 
  priceComputed: boolean = false;
  computedPrice: number = 0;
  isLoggedIn: boolean = false;
  email: string;

  constructor(

    private authService: UserAuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private languageTrainingService :  LanguageTrainingService,
    private emailComponent: UserAuthService
  ) {
    this.form = this.formBuilder.group({
      option1: [null, [Validators.required]],
      option2: [null, [Validators.required]],
    });
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.email = this.emailComponent.getUserEmail();
  }

  isFormValid(): boolean {
    return this.form.valid && this.form.get('option1')!.value !== null && this.form.get('option2')!.value !== null;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.form.get('option1')?.markAsTouched();
    this.form.get('option2')?.markAsTouched();

    if (this.isFormValid()) {
      const formData = new FormData();
    formData.append('option1', this.form.get('option1')?.value);
    formData.append('option2', this.form.get('option2')?.value);
    formData.append('email', this.email);



      this.languageTrainingService.postData(formData).subscribe(
        response => {
          console.log('Form submitted successfully.');
          console.log(response);
          this.formSubmitted = true;
        },
        error => {
          console.error('Error submitting the form:', error);
        }
      );
    } else {
      console.log('Form not submitted. Please correct the form errors.');
    }
  }
  calculatePrice(): void {
    const option2 = this.form.get('option2')?.value;
  
    let computedPrice = 0;
  
    switch (option2) {
      case 'A1 - 4 months':
        computedPrice = 100;
        break;
      case 'A2 - 6 months':
        computedPrice = 150;
        break;
      case 'B1 - 8 months':
        computedPrice = 200;
        break;
      case 'B2 - 10 months':
        computedPrice = 250;
        break;
      case 'C1 - 12 months':
        computedPrice = 300;
        break;
      case 'C2 - 15 months':
        computedPrice = 400;
        break;
      default:
        break;
    }
    
  
    this.computedPrice = computedPrice;
    this.priceComputed = true;
  }
  
}

