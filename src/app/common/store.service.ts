import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from './util';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Store {
  init() {
    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$
      .pipe(
          tap(() => console.log("HTTP request executed")),
          map(res => Object.values(res["payload"]) )
      ).subscribe(
        courses => this.subject.next(courses)
      )
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER')
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED')
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map(
        courses => courses.filter(course => course.category == 'BEGINNER')
        )
      )
  }

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();
}
