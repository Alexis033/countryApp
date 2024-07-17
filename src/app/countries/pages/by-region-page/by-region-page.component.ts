import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Central America'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';
@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: `
  `,
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Asia',
    'Americas',
    'North America',
    'Central America',
    'South America',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region;

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}
  searchByRegion(region: Region) {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
