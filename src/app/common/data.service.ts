import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Lesson } from './../model/lesson';
@Injectable({
  providedIn: 'root'
})
export class Data {
  private testSubject$ = new BehaviorSubject<Lesson>({});
  public lesson$: Observable<Lesson> = this.testSubject$.asObservable();

  constructor() { }

  sendLessons(data: Lesson) {
    this.testSubject$.next(data);
  }
}
