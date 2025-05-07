import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Form } from '../../../utils/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = Form;
  myForm:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(5)]],
    price:[0, [Validators.required, Validators.min(1)]],
    inStorage:[0, [Validators.min(0)]]
  })

  onSave() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage:0
    })
  }
}
