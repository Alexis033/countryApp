import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  constructor(private countriesService: CountriesService) {}
  searchByCapital(term: string) {
    this.countriesService.searchCapital(term);
  }
}
