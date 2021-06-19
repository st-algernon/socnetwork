import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";

export function forbiddenUsernameValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService.verificationUsername(control.value).pipe(
        map(
            (result: boolean) => result ? {forbiddenUsername: {value: control.value}} : null
        )
      );
    };
}

export function forbiddenEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return authService.verificationEmail(control.value).pipe(
      map(
          (result: boolean) => result ? {forbiddenUsername: {value: control.value}} : null
      )
    );
  };
}