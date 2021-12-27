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
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from './../common/util';


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

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);

        // From Lesson 16
        // this.lessons$ = createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100`)
        // .pipe(
        //   map((res) => res['payload'])
        // )


    }

    ngAfterViewInit() {
      //  From Lesson 18
      const intitialLessons$ = this.loadLessons();

      // Lesson 17
      const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup') //keyboard click events
      .pipe(
        map(event => event.target.value), // value of click events are mapped
        debounceTime(400), // the search value will be considered stable only if it remains unchanged for 400ms
        distinctUntilChanged(), // only distinct values are returned. no repeated values
        // From Lesson 18
        switchMap(search => this.loadLessons(search))
      )

      //  From Lesson 18
      this.lessons$ = concat(intitialLessons$, searchLessons$)

    }

    loadLessons(search = ''): Observable<Lesson[]> {
      return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map((res) => res['payload'])
      )
    }




}
