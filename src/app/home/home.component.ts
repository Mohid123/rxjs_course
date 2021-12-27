import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter, finalize } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


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

      const http$ = createHttpObservable('/api/courses');

      const courses$: Observable<Course[]> = http$.pipe(
        tap(() => console.log("Http Request Executed")), //tap is used for emitting side effects outside the observable stream i.e for errors or consoling etc.
        map(
          res => Object.values(
            res['payload'])
            ),
            shareReplay(),
            //Lesson 21
            retryWhen(errors => errors.pipe(
              delayWhen(() => timer(2000)) //after 2s a new http stream will be created by retryWhen. delay when waits 2s and then returns observabele after error is thrown. normal delay() would delay error stream by 2s which is not what we want
            )) //retryWhen will create a new http stream each time an error is thrown by the http stream and subscribe to it until the error is resolved


            // Lesson 20
            // catchError(err => {console.log('An Error has occurred', err) //the error can be passed first instead of the tap and map to stop dual execution of observable subscription as seen in console
            //   return throwError(err)
            // }),
            // // clean up logic after error
            // finalize(() => {
            //   console.log('Finalize Executed...')
            // })

            //Lesson 19

            // catchError(err => of([])) //empty array returned
              // {
              //   id: 0,
              //   description: "Error has Occured",
              //   iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
              //   courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
              //   longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
              //   category: 'BEGINNER',
              //   lessonsCount: 10
              // },
            //])) // The recovery observable strategy. This array is displayed if error occurs. catchError creates a recovery observable with any value we pass it.
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

}
