import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-interpretation',
  templateUrl: './interpretation.component.html',
  styleUrls: ['./interpretation.component.css']
})
export class InterpretationComponent {

  selectedProduct!: string;
  options: string[] = ['English', 'Romanian', 'French', 'German', 'Italian', 'Spanish'];
  timeOptions: string[] = ['15 minutes', '30 minutes', '45 minutes', '60 minutes']
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
    private interpretationService: InterpretationService,
    private emailComponent: UserAuthService
  ) {
    this.form = this.formBuilder.group({
      option1: [null, [Validators.required]],
      option2: [null, [Validators.required]],
      option3: [null, [Validators.required]],
    });
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.email = this.emailComponent.getUserEmail();
  }

  isFormValid(): boolean {
    return this.form.valid && this.form.get('option1')!.value !== null && this.form.get('option2')!.value !== null && this.form.get('option3')!.value !== null;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.form.get('option1')?.markAsTouched();
    this.form.get('option2')?.markAsTouched();
    this.form.get('option3')?.markAsTouched();

    if (this.isFormValid()) {
      const formData = new FormData();
    formData.append('option1', this.form.get('option1')?.value);
    formData.append('option2', this.form.get('option2')?.value);
    formData.append('option3', this.form.get('option3')?.value);
    formData.append('email', this.email);



      this.interpretationService.postData(formData).subscribe(
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
    const option3 = this.form.get('option3')?.value;
  
    // Implement price calculation based on time
    let computedPrice = 0;
  
    switch (option3) {
      case '15 minutes':
        computedPrice = 25;
        break;
      case '30 minutes':
        computedPrice = 50;
        break;
      case '45 minutes':
        computedPrice = 75;
        break;
      case '60 minutes':
        computedPrice = 100;
        break;
      default:
        break;
    }
  
    this.computedPrice = computedPrice;
    this.priceComputed = true;
  }
  
}

