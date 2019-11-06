import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ageValidator, UniqueAlterEgoValidator} from '../validators/age.validator';
import { ReferrerService } from '../referrer.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private referrerService: ReferrerService) {}
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, ageValidator(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    referrer: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  zipCodes = [];

  ngOnInit() {
    this.zipCodes = [
      {city: 'Taipei', zip: '100' },
      {city: 'Kaohsiung', zip: '800' },
      {city: 'Keelung', zip: '200' },
      {city: 'Hsinchu', zip: '300' },
      {city: 'Taichung', zip: '400' },
      {city: 'Chiayi', zip: '600' },
      {city: 'Tainan', zip: '700' },
      {city: 'Taipei', zip: '220'},
      {city: 'Taoyuan', zip: '330'},
      {city: 'Hsinchu', zip: '300'},
      {city: 'Miaoli	', zip: '360'},
      {city: 'Taichung', zip: '420'},
      {city: 'Changhua', zip: '500'},
      {city: 'Nantou	', zip: '540'},
      {city: 'Yunlin', zip: '640'},
      {city: 'Chiayi', zip: '600'},
      {city: 'Tainan', zip: '730'},
      {city: 'Kaohsiung', zip: '830'},
      {city: 'Pingtung', zip: '900'},
      {city: 'Yilan', zip: '260'},
      {city: 'Hualien', zip: '970'},
      {city: 'Taitung	', zip: '950'},
      {city: 'Penghu', zip: '880'},
    ];

    this.registerForm.statusChanges.subscribe(status => {
      // console.log('status change:', status);
    });
    this.registerForm.valueChanges.subscribe((value: any) => {
      // console.log('value change:', value);
    });

    this.registerForm.get('location').valueChanges.subscribe((value: any) => {
      const target = this.zipCodes.find((zipCode: any) => zipCode.city === value);
      if (target) {
        this.registerForm.patchValue({
          zip: target.zip
        }, { emitEvent: false });
      }
    });

    this.registerForm.get('zip').valueChanges.subscribe((value: any) => {
      const target = this.zipCodes.find((zipCode: any) => {
        return zipCode.zip === value;
      });
      if (target) {
        this.registerForm.patchValue({
          location: target.city
        }, { emitEvent: false });
      }
    });
  }

  reset() {
    this.registerForm.reset();
  }

  submit() {
    console.log('submit');
    this.referrerService.getReferrers().subscribe((response) => {
      console.log(response);
    });
  }
}
