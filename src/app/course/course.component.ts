import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, throttleTime, throttle
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from './../common/util';
import { debug, RxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>; // observable to hold the course values
    lessons$: Observable<Lesson[]>; //observable to hold the lesson array
    courseId: string;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {
      // Lesson 16

        this.courseId = this.route.snapshot.params['id'];

        const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

        const lesson$ = this.loadLessons();

        // Lesson 24
        forkJoin(course$, lesson$).pipe(
          tap(([course, lessons]) => {
            console.log('courses: ', course)
            console.log('lessons: ', lessons)
          })
        );

        //this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
        // .pipe(
        //   tap(course => console.log("course value: ", course))
        // );

        // From Lesson 16
        // this.lessons$ = createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100`)
        // .pipe(
        //   map((res) => res['payload'])
        // )


    }

    ngAfterViewInit() {
      //  From Lesson 18
      // const intitialLessons$ = this.loadLessons();

      // // Lesson 17
      // const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup') //keyboard click events

      this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value), // value of click events are mapped
        // Lesson 22 -- startWith only
        startWith(''), //will ensure that initially all the data is rendered before search logic works
        //tap(search => console.log("search", search)),
        debounceTime(400), // the search value will be considered stable only if it remains unchanged for 400ms
        // Lesson 23 - throttle
        //throttle(() => interval(500)), //throttle waits for the specified period of time and then emits the next value. All values inside the throttle duration are omitted
        //throttleTime(300),
        distinctUntilChanged(), // only distinct values are returned. no repeated values
        // From Lesson 18
        switchMap(search => this.loadLessons(search)) //switchMap ensures that if a new event stream occurs the previous one gets cancelled
      )

      //  From Lesson 18
      // this.lessons$ = concat(intitialLessons$, searchLessons$)

    }

    loadLessons(search = ''): Observable<Lesson[]> {
      return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map((res) => res['payload'])
      )
    }




}
