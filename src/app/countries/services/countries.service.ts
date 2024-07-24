import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: undefined, countries: [] },
  };
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cacheStoreJson = localStorage.getItem('cacheStore');
    if (cacheStoreJson !== null) {
      this.cacheStore = JSON.parse(cacheStoreJson);
    }
    return;
  }

  private getCountriesRequest(
    route: string,
    query: string,
  ): Observable<Country[]> {
    const url = `${this.apiUrl}/${route}/${query}`;
    return this.http.get<Country[]>(url).pipe(catchError((error) => of([])));
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest('capital', capital).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term: capital, countries };
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest('name', country).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term: country, countries };
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest('region', region).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region, countries };
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => countries[0] || null),
      catchError((error) => of(null)),
    );
  }
}
