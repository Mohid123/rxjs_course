import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from './util';
import { tap, map, filter } from 'rxjs/operators';
import { saveCourse } from './../../../server/save-course.route';
import { fromPromise } from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class Store {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable('/api/courses');

    http$
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

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id == courseId)),
      filter(course => !!course) //the first value will be empty array. This will ensure that the empty array is filtered out
    )
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map(
        courses => courses.filter(course => course.category == category)
        )
      )
  }

  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue(); //get the complete array of courses
    const coursesIndex = courses.findIndex(course => course.id == courseId); //get a course by id
    const newCourses = courses.slice(0); //a new array that will broadcast the new changed values
    newCourses[coursesIndex] = {
      ...courses[coursesIndex],
      ...changes //a new array which is identical to the previous array but now reflects the new changes
    }
    this.subject.next(newCourses); //broadcast the new value with the new changes

    return fromPromise(fetch(`/api/courses/${courseId}`,  { //send the put request to update the backend with the new data.
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }
}
