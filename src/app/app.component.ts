import { Component, OnInit } from '@angular/core';
import { TabType } from './Entities/EnumType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'annotate-singlepage';
  TabType = TabType;
  selectedTab: TabType;

  constructor(){
    this.selectedTab = TabType.Sentence;
  }

  ngOnInit(): void {
    this.selectedTab = TabType.Sentence;
  }
}
