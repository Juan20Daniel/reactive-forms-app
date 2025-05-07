import { FormGroup } from "@angular/forms";

export class Form {
  static isValidField(form:FormGroup, fieldname: string):boolean | null {
    return (!!form.controls[fieldname].errors && form.controls[fieldname].touched);
  }

  static getFieldError(form:FormGroup, fieldname:string): string | null {
    if(!form.controls[fieldname]) return null;
    const errors = form.controls[fieldname].errors ?? {}
    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo ${errors['min'].min}.`;
      }
    }
    return null;
  }
}
