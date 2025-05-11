import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Form } from '../../../utils/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = Form;

  myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([], [Validators.required, Validators.minLength(2)])
  });

  newFavorteGame = new FormControl('', Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if(this.newFavorteGame.invalid) return;

    const newGame = this.newFavorteGame.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorteGame.reset();
  }

  onDeleteGame(index:number) {
    this.favoriteGames.removeAt(index);
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
  }
}
