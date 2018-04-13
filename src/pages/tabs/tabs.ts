import { Component } from '@angular/core';
import { SearchPage } from '../search/search';
import { AddPage } from '../add/add';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  addPage = AddPage;
  searchPage = SearchPage;
  

}
