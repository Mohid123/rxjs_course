import { Component, OnInit } from '@angular/core';
import { Store } from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store: Store) {
  }

  ngOnInit(): void {
      this.store.init(); //will be called only once when app starts
  }
}
