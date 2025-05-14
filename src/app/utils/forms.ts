import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

export class Form {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors:ValidationErrors) {
    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo ${errors['min'].min}.`;
        case 'email':
          return `El email no es válido.`;
        case 'emailTaken':
          return `El email no esta disponible.`;
        case 'notStrider':
          return 'El nombre de strider no esta permitido'
        default:
          return 'Error de validación no controlado'
      }
    }
    return null;
  }

  static isValidField(form:FormGroup, fieldname: string):boolean | null {
    return (!!form.controls[fieldname].errors && form.controls[fieldname].touched);
  }

  static getFieldError(form:FormGroup, fieldname:string): string | null {
    if(!form.controls[fieldname]) return null;
    const errors = form.controls[fieldname].errors ?? {}
    return this.getTextError(errors);
  }

  static isValidFieldArray(form:FormArray, index:number) {
    return form.controls[index].errors && form.controls[index].touched
  }

  static getFieldErrorInArray(form:FormArray, index:number): string | null {
    console.log(form.controls)
    if(form.controls.length === 0) return null;
    const errors = form.controls[index].errors ?? {}
    return this.getTextError(errors);
  }

  static compareFields(field1:string, field2:string) {
    return (formGroup:AbstractControl) => {
      //el ? es porque puede que el campo no exista o sea null
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value
        ? null
        : { passwordsNotEqual:true } ;
    }
  }

  static async checkingServerResponse(control:AbstractControl): Promise<ValidationErrors | null> {
    console.log('Consultando al servidor');
    await sleep();
    const formValue = control.value;

    if(formValue === 'hola@gmail.com') {
      return {
        emailTaken:true
      }
    }
    return null;
  }

  static notStrider(control:AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    console.log('check');
    if(formValue === 'strider') {
      return {
        notStrider:true
      }
    }
    return null;
  }
}
