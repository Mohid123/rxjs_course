import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //From Lesson 8 - better approach
  beginnersCourse$: Observable<Course[]>;
  advancedCourse$: Observable<Course[]>;


 // From Lesson 7
  beginnersCourse: Course[];
  advancedCourse: Course[];


    constructor() {

    }

    ngOnInit() {

      // Lesson 7 - Seperating the view of advanced and beginner courses

      const http$ = this.createHttpObservable('/api/courses');

      // From Lesson 7

      const courses$: Observable<Course[]> = http$.pipe(
        tap(() => console.log("Http Request Executed")), //tap is used for emitting side effects outside the observable stream i.e for errors or consoling etc.
        map(
          res => Object.values(
            res['payload'])
            ),
            shareReplay()
          );

      // Lesson 8 - continues from 7
      this.beginnersCourse$ = courses$.pipe(
        map(
          courses => courses.filter(x => x.category == 'BEGINNER')
          )
      );

      this.advancedCourse$ = courses$.pipe(
        map(courses => courses.filter(x => x.category == 'ADVANCED')
        )
      );



      // From Lesson 7 - Old approach

      // courses$.subscribe(courses => {
      //   this.beginnersCourse = courses.filter(x => x.category == 'BEGINNER'),
      //   this.advancedCourse = courses.filter(x => x.category == 'ADVANCED'),
      //   noop,
      //   () => console.log('completed')
      // })

    }
/// Our custom observable
    createHttpObservable(url: string) {
      return Observable.create(observer => {
        fetch('/api/courses').then(response => {
          return response.json()
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        })
      })
    }

}
