import { AbstractControl, ValidatorFn, AsyncValidator, ValidationErrors } from '@angular/forms';
import { ReferrerService } from '../referrer.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export function ageValidator(age: number): ValidatorFn {
  return (control: AbstractControl) => {
    const ageValid = age > control.value;
    return ageValid ? {ageInValid: {value: control.value}} : null;
  };
}

export class UniqueAlterEgoValidator implements AsyncValidator  {
  constructor(private referrerService: ReferrerService) {
}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      console.log('hello');
      return this.referrerService.getReferrers().pipe(
        map(isTaken => (console.log(isTaken))),
        catchError(() => null)
      );
  }
}
