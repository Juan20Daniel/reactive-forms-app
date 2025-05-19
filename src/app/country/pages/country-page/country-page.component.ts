import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {
  contryService = inject(CountryService);
  fb = inject(FormBuilder);
  regions = signal(this.contryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region:['', Validators.required],
    country:['', Validators.required],
    borders:['', Validators.required],
  });
  onFormChanged = effect((onCleanup) => {
    const regionSuscription = this.onRegionChanged();
    const countrySuscription = this.onCountryChanged();
    onCleanup(() => {
      regionSuscription.unsubscribe();
      countrySuscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('borders')!.setValue('')),
      tap(() => {
        this.countriesByRegion.set([]);
        this.borders.set([]);
      }),
      switchMap(region => this.contryService.getCountryByRegion(region??''))
    )
    .subscribe(countries => {
      console.log(countries)
      this.countriesByRegion.set(countries);
    });
  }
  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('borders')!.setValue('')),
      filter(currentvalue => currentvalue!.length !== 0),
      tap(() => {
        this.borders.set([]);
      }),
      switchMap(alphaCode => this.contryService.getCountryByAlphaCode(alphaCode??'')),
      switchMap(country => this.contryService.getCountryNamesByCodes(country.borders))
    ).subscribe(borders => {
      this.borders.set(borders);
    })
  }
}
