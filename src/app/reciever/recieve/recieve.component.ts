import { Component, OnInit } from '@angular/core';
import { Data } from '../../common/data.service';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'recieve',
  templateUrl: './recieve.component.html',
  styleUrls: ['./recieve.component.scss']
})
export class RecieveComponent implements OnInit {

  responseData: Lesson;

  constructor(private dataService: Data) { }

  ngOnInit(): void {
    this.getLessonsData()
  }

  getLessonsData() {
    this.dataService.lesson$.subscribe((response) => {
      this.responseData = response;
      const data = this.responseData;
      localStorage.setItem('data', JSON.stringify(data));
    })
  }

}
