import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form } from '../../../utils/forms';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  formUtils = Form;

  myForm = this.fb.group({
    fullname:[
      '',
      [Validators.required, Validators.pattern(Form.namePattern)]
    ],
    email:[
      '',
      [Validators.required, Validators.pattern(Form.emailPattern)],
      [this.formUtils.checkingServerResponse]
    ],
    username:[
      '',
      [
        Validators.required, Validators.minLength(6),
        Validators.pattern(Form.notOnlySpacesPattern),
        this.formUtils.notStrider
      ],
    ],
    password:[
      '',
      [Validators.required, Validators.minLength(6)]
    ],
    confirmPassword:['', Validators.required]
  },{
    validators: [
      this.formUtils.compareFields('password', 'confirmPassword')
    ]
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
