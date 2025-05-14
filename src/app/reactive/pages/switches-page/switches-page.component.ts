import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Form } from '../../../utils/forms';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);
  formUtils = Form;
  myForm:FormGroup = this.fb.group({
    genero:[, Validators.required],
    wantNotifications:[true],
    termsAndConditions:[false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
  }
}
