import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';
  private getCountriesRequest(
    route: string,
    query: string,
  ): Observable<Country[]> {
    const url = `${this.apiUrl}/${route}/${query}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => of([])),
      delay(300),
    );
  }

  constructor(private http: HttpClient) {}

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest('capital', capital);
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest('name', country);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest('region', region);
  }

  searchAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => countries[0] || null),
      catchError((error) => of(null)),
    );
  }
}
