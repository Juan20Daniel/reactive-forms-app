import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class Form {

  static getTextError(errors:ValidationErrors) {
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
}
