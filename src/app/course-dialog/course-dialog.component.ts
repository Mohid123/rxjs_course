import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {

  //Lesson 13 -- MERGEMAP

      // this.form.valueChanges.pipe(
      //   filter(() => this.form.valid),
      //   mergeMap(
      //     changes => this.saveCourse(changes)
      //     )
      // )
      // .subscribe();

   // Lesson 11 -- CONCATMAP

      this.form.valueChanges.pipe(
        filter(() => this.form.valid),
        concatMap(
          changes => this.saveCourse(changes)
          )
      )
      .subscribe();

    // Lesson 10

        //Double subscribe is bad

        //changes => {

        // const saveCourse$ = this.saveCourse(changes);
        // saveCourse$.subscribe();

        // const saveCourse$ = fromPromise(fetch(`/api/courses/${this.course.id}`, {
        //   method: "PUT",
        //   body: JSON.stringify(changes),
        //   headers: {
        //     'content-type': 'application/json'
        //   }
        // }));

        //saveCourse$.subscribe() // subscribe inside a subscribe is bad practice
      //}
      //);

      //fromPromise is a rxjs operator that converts promises to observable
      //since fetch() returns a promise we need to use fromPromise

    }


    // Lesson 11 --- CONCATMAP

    saveCourse(changes) {
      return fromPromise(fetch(`/api/courses/${this.course.id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
    }



    ngAfterViewInit() {
      // LESSON 14 -- Exhaust Map
      //perfect for preventing multiple event streams such as multiple click events etc.
      fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
         (() => this.saveCourse(this.form.value))
      ).subscribe();
    }



    close() {
        this.dialogRef.close();
    }

}
