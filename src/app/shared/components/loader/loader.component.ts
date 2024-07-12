import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input()
  public color: string = '#000';

  @Input()
  public text: string = '';
}
