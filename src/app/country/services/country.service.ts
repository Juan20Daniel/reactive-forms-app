import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseURL = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

  get regions(): string[] {
    return [...this._regions]
  }

  getCountryByRegion(region:string): Observable<Country[]> {
    if(!region) return of([]);
    console.log({region});
    const url = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
  }
  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }
  getCountryNamesByCodes(countryCodes:string[]): Observable<Country[]> {
    if(countryCodes.length === 0) return of([]);

    const countryRequest: Observable<Country>[] = [];
    countryCodes.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countryRequest.push(request);
    })
    //Este operador nos permite pasar un arreglo de suscripciones  vamos a poder trabajar con ellas y esperar a que todas se emitan y tener todos los valores cuando cada una se cumpla con exito
    return combineLatest(countryRequest)
    return of([]);
  }
}
