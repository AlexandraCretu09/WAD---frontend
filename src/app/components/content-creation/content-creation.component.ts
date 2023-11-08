import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { ContentCreationService } from 'src/app/services/content-creation.service';

@Component({
  selector: 'app-content-creation',
  templateUrl: './content-creation.component.html',
  styleUrls: ['./content-creation.component.css']
})
export class ContentCreationComponent {
  selectedProduct!: string;
  options: string[] = [
    'Blog Articles', 'Advertising Texts', 'Social Media Ads',
    'Copywriting', 'Ghost Writing', 'Subtitle Creation', 'Subtitle Translation', 'Transcription'
  ];
  langOptions: string[] = ['English', 'Romanian', 'French', 'German', 'Italian', 'Spanish'];
  profOptions: number[] = [0.2, 0.5, 0.5, 0.2, 0.5, 50, 100, 3, 3, 1.5]
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
    private contentCreationService :  ContentCreationService,
    private emailComponent: UserAuthService
  ) {
    this.form = this.formBuilder.group({
      option1: [null, [Validators.required]],
      option2: [null, [Validators.required]],
      wordCount: [null, [Validators.required, Validators.min(1)]]
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
    formData.append('no of words',this.form.get('wordCount')?.value);



      this.contentCreationService.postData(formData).subscribe(
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
    const wordCountControl = this.form.get('wordCount');
    wordCountControl?.markAsTouched();
    if (wordCountControl?.valid) {
    
    const numberOfWords = wordCountControl.value;
    
    let computedPrice = 0;
  
    switch (option2) {
      case 'Blog Articles':
        computedPrice = numberOfWords * 0.2;
        break;
      case 'Advertising Texts':
      case 'Social Media Ads':
      case 'Copywriting':
      case 'Ghost Writing':
        computedPrice = numberOfWords * 0.5;
        break;
      /*case 'Proofreading':
        computedPrice = 50; // Assuming $50 per page
        break;
      case 'Professional Editing':
        computedPrice = 100; // Assuming $100 per page
        break;*/
      case 'Subtitle Creation':
      case 'Subtitle Translation':
        computedPrice = numberOfWords * 0.3; // Assuming $3 per minute
        break;
      case 'Transcription':
        computedPrice = numberOfWords * 0.15; // Assuming $1.5 per minute
        break;
      default:
        break;
    }
  
    this.computedPrice = computedPrice;
    this.priceComputed = true;
    }
  }
}


