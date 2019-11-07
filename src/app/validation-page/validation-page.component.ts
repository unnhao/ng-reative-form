import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ReferrerValidator } from '../validators/async.validator';

@Component({
  selector: 'app-validation-page',
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.css']
})
export class ValidationPageComponent implements OnInit {

  constructor(private referrerValidator: ReferrerValidator) { }

  validationForm: FormGroup;
  cityData: Array<{name: string, zip: string}>;

  ngOnInit() {
    this.validationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, this.numberValidator(), this.ageValidator(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', { validators:  [Validators.required], updateOn: 'blur'}),
      referrer: new FormControl('', {
        asyncValidators: [this.referrerValidator.validate.bind(this.referrerValidator)],
        updateOn: 'blur'
      })
    });

    this.cityData = [
      {name: 'Taipei', zip: '100' },
      {name: 'Kaohsiung', zip: '800' },
      {name: 'Keelung', zip: '200' },
      {name: 'Hsinchu', zip: '300' },
      {name: 'Taichung', zip: '400' },
      {name: 'Chiayi', zip: '600' },
      {name: 'Tainan', zip: '700' },
      {name: 'Taipei', zip: '220'},
      {name: 'Taoyuan', zip: '330'},
      {name: 'Hsinchu', zip: '300'},
      {name: 'Miaoli	', zip: '360'},
      {name: 'Taichung', zip: '420'},
      {name: 'Changhua', zip: '500'},
      {name: 'Nantou	', zip: '540'},
      {name: 'Yunlin', zip: '640'},
      {name: 'Chiayi', zip: '600'},
      {name: 'Tainan', zip: '730'},
      {name: 'Kaohsiung', zip: '830'},
      {name: 'Pingtung', zip: '900'},
      {name: 'Yilan', zip: '260'},
      {name: 'Hualien', zip: '970'},
      {name: 'Taitung	', zip: '950'},
      {name: 'Penghu', zip: '880'},
    ];

    // listener
    this.validationForm.get('city').valueChanges.subscribe((value: any) => {
      const target = this.cityData.find((zipCode: any) => zipCode.name === value);
      if (this.zip.value !== target.zip) {
        this.validationForm.patchValue({
          zip: target.zip
        });
      }
    });

    this.validationForm.get('zip').valueChanges.subscribe((value: any) => {
      const target = this.cityData.find((zipCode: any) => {
        return zipCode.zip === value;
      });
      if (!target) {
        return this.zip.setErrors({
          zipInvalid: true
        });
      }
      if (this.city.value !== target.name) {
        this.validationForm.patchValue({
          city: target.name
        });
      }
    });
  }

  // get
  get name() { return this.validationForm.get('name'); }
  get gender() { return this.validationForm.get('gender'); }
  get age() { return this.validationForm.get('age'); }
  get email() { return this.validationForm.get('email'); }
  get city() { return this.validationForm.get('city'); }
  get zip() { return this.validationForm.get('zip'); }
  get referrer() { return this.validationForm.get('referrer'); }

  // checkValidStyle
  checkValidStyle(formControl: AbstractControl) {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched)
    };
  }

  // customize validator
  ageValidator(age: number): ValidatorFn {
    return (control: AbstractControl) => {
      const ageValid = age > control.value;
      return ageValid ? {ageInValid: control.value} : null;
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return isNaN(control.value) ? {numberInValid: control.value} : null;
    };
  }

  reset() {
    this.validationForm.reset();
  }

  submit() {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      alert('Submit');
      this.reset();
    }
  }
}
