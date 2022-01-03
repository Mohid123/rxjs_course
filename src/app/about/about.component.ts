import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject, AsyncSubject, ReplaySubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

      // Lesson 25 --- RxJS Subject

        //const subject  = new Subject();
        // Methods available for subject. Notice that it has methods for bothe observable (pipe) and observer (next, error, complete)

        // subject.next();
        // subject.pipe();
        // subject.error
        // subject.complete();

      // Lesson 26 -- Behavior Subject. Emits the latest value in a subscription from an observable stream. It will always emit the latest value unlike the Subject
      // which emits only the value that is given and subscribed to in .next();

      // const subject = new BehaviorSubject(0);

      // const series$ = subject.asObservable();
      // subject.next(1);
      // subject.next(2);

      // series$.subscribe(
      //   val => console.log('late sub: ', val)
      // )

      // Lesson 27 -- asyncSubject. It is used in cases where some long running calculation is ongoing and we are progressively reporting the latest value.
      // replaySubject replays the entire observable stream from start to finish.

      // const subject = new AsyncSubject();

      // const series$ = subject.asObservable();

      // series$.subscribe(
      //   val => console.log('Early Sub: ', val)
      // )

      // subject.next(1);
      // subject.next(2);
      // subject.next(3);

      // subject.complete();

      // setTimeout(() => {
      //   series$.subscribe(val => console.log('late sub: ', val))
      // }, 3000)

      const subject = new ReplaySubject();

      const series$ = subject.asObservable();

      series$.subscribe(
        val => console.log('Early Sub: ', val)
      )

      subject.next(1);
      subject.next(2);
      subject.next(3);

      subject.complete();

      setTimeout(() => {
        series$.subscribe(val => console.log('late sub: ', val))
      }, 3000)


    }


}






