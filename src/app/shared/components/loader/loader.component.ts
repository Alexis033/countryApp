import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styles: ``,
})
export class LoaderComponent {
  @Input()
  public color: string = '#000';
}
