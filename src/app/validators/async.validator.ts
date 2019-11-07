import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { ReferrerService } from '../referrer.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReferrerValidator implements AsyncValidator {
  constructor(private referrerService: ReferrerService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.referrerService.getReferrer(ctrl.value).pipe(
      map((referrer: any) => (!referrer.length ? { referrerInValid: true } : null)),
      catchError((error): any =>  of({referrerInValid: error.message}))
    );
  }
}
