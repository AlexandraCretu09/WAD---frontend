import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  selectedProduct!: string;
  options: string[] = ['English', 'Romanian', 'French'];
  formSubmitted = false; 
  form: FormGroup;
  priceComputed: boolean = false;
  computedPrice: number = 0;
  isLoggedIn: boolean = false;
  email: string;


  constructor(

    private authService: UserAuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
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
    console.log(this.email);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedProduct = params['type'];
    });
  }

  isFormValid(): boolean {
    return this.form.valid && this.form.get('option1')!.value !== null && this.form.get('option2')!.value !== null;
  }


  selectedFile: File | null = null;
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    this.form.get('option1')?.markAsTouched();
    this.form.get('option2')?.markAsTouched();

    if (this.isFormValid()) {
      const formData = new FormData();
    formData.append('option1', this.form.get('option1')?.value);
    formData.append('option2', this.form.get('option2')?.value);
    

    // Append the selected file to the FormData
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    formData.append('email', this.email);



      this.productService.postData(formData).subscribe(
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

  computePrice()  {
    const wordCountControl = this.form.get('wordCount');
  
    // Mark the wordCount control as touched to trigger validation
    wordCountControl?.markAsTouched();
  
    if (wordCountControl?.valid) {
      const wordCount = wordCountControl.value;
  
      // Implement your price calculation logic here
      // For example, a simple calculation based on a rate per word:
      const ratePerWord = 0.05; // Adjust the rate as needed
      this.computedPrice = wordCount * ratePerWord;
      this.priceComputed = true;
    }
  }
  /*
  differentOptionValidator(control: AbstractControl) {
    const option1 = control.get('option1')?.value;
    const option2 = control.get('option2')?.value;

    //console.log("Options: " + option1 + " " + option2);

    if (option1 === option2) {
      return { sameOption: true };
    }
    return null;
  }
*/
}

