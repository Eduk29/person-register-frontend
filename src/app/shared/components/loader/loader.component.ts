import { Component, Input } from '@angular/core';

@Component({
  selector: 'edv-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() displayMode: 'card' | 'default' = 'default';
  @Input() isLoading?: boolean;

  public get isCardMode(): boolean {
    return this.displayMode === 'card';
  }
}
