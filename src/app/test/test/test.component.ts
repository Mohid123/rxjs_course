import { Component, OnInit } from '@angular/core';
import { Data } from '../../common/data.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Lesson } from '../../model/lesson';
import { Router } from '@angular/router';


@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  lessonForm: FormGroup

  constructor(private dataService: Data, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initLessonForm()
  }

  initLessonForm() {
    this.lessonForm = this.formBuilder.group({
      id: [0, Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      seqNo: [0, Validators.required],
      courseId: [0, Validators.required]
    })
  }

  sendNewData() {
    const payload: Lesson = {
      id: this.lessonForm.value.id,
      description: this.lessonForm.value.description,
      duration: this.lessonForm.value.duration,
      seqNo: this.lessonForm.value.seqNo,
      courseId: this.lessonForm.value.courseId
    }

    this.dataService.sendLessons(payload);
    this.router.navigate(['reciever']);
  }

}
