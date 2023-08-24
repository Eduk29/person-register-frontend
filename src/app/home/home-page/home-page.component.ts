import { Component } from '@angular/core';
import { ISearchFilter } from 'src/app/shared/models/search-filter.model';

@Component({
  selector: 'edv-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public search(filter: ISearchFilter): void {
    console.log('Filter: ', filter);
  }
}
