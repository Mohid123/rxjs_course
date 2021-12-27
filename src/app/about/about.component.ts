import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, Observable, noop, of, concat, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // //What is a stream? everything is asynchronous in JS and all these are streams of eventss
    // //Click events on the page are streams, never complete
    // document.addEventListener('click', evt => {
    //   console.log(evt)
    // });

    // // intervals are also streams- emits continuously, never completes
    // let counter = 0;
    // setInterval(() => {
    //   console.log(counter);
    //   counter++;
    // }, 2000);

    // //calling setTimeout - emits value only once and completes

    // setTimeout(() => {
    //   console.log('finished...')
    // }, 3000)

// Lesson2: Combining values results in a nested callback like below

    // document.addEventListener('click', evt => {
    //   console.log(evt)
    //   setTimeout(() => {
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 2000);
    //     console.log('finished...')
    //   }, 3000)
    // });

//Lesson 3-  What is an observable?

    // const interval$ = interval(1000); //defining an observable. dollar sign is used to denote an observable. The observable parametrically gets type number
    // interval$.subscribe(val => console.log('stream 1 => ' + val)); //subscribe means a stream of values is created
    // interval$.subscribe(val => console.log('stream 2 => ' + val)); //observable can be subscribed multiple times with both subscriptions emitting values seperately

    // const interval$ = timer(3000, 1000);
    // interval$.subscribe(val => console.log('stream 1 => ' + val));

    // const click$ = fromEvent(document, 'click');
    // click$.subscribe(val => console.log(val));

// Lesson 4 - Subscribe methods basics

    // const click$ = fromEvent(document, 'click');
    // const sub = click$.subscribe(
    //   val => console.log(val),
    //   err => console.log(err), //observables either error out or complete after they emit all their values
    //   () => console.log('completed')
    //   );

    //   setTimeout(() => {
    //     sub.unsubscribe()
    //   }, 5000)

// Lesson 5 - Create your own custom http observable

  // fetch('/api/courses'); //http call to backend in the form of a promise

  // const http$ =  Observable.create(observer => {
  //   fetch('/api/courses').then(response => {
  //     return response.json()
  //   })
  //   .then(body => {
  //     observer.next(body);
  //     observer.complete();
  //   })
  //   .catch(err => {
  //     observer.error(err);
  //   })
  // })

  // http$.subscribe(
  //   courses => console.log(courses),
  //   noop, //no operation operator fromn rxjs
  //   () => console.log('completed')
  // );

// Lesson 6 - The map operator
  // create a seperate function for the http get req for convenience
// function createHttpObservable(url: string) {
//   return Observable.create(observer => {
//     fetch('/api/courses').then(response => {
//       return response.json()
//     })
//     .then(body => {
//       observer.next(body);
//       observer.complete();
//     })
//     .catch(err => {
//       observer.error(err);
//     })
//   })
// }

const http$ = createHttpObservable('/api/courses');

const sub1 = http$.subscribe(console.log);

// const courses$ = http$.pipe(
//   map(
//     res => Object.values(
//       res['payload'])//object.values converts to array. The output is an observable that emits an array of courses.
//       ) //The map operator maps the incoming observable into any other value we want to manipulate or transform it to.
// );

// const sub1 = courses$.subscribe(courses => {
//   console.log(courses),
//   noop,
//   () => console.log('completed')
// });

setTimeout(() => {
  sub1.unsubscribe();
}, 0)

// Lesson 7 - Seperating the view of advanced and beginner courses
// Go to home component for lesson 7

//Lesson 9

//Concat Operator

  //const source1$ = of(1, 2, 3);
//   const source1$ = interval(1000)
//   const source2$ = of(4, 5, 6);
//   const source3$ = of(7, 8, 9);

//   // we want to combine them together. But the result should be sequential.
//   //i.e source1 should complete first and then source2

// const result$ = concat(source1$, source2$, source3$)

// result$.subscribe(val => console.log(val)); //all concatenated together


// Lesson 10 see coursedialogcomponent

// Lesson 12 --- merge

  // const interval1 = interval(1000);
  // const interval2 = interval1.pipe(map(val => val*10));

  // const result2$ = merge(interval1, interval2);

  // result2$.subscribe(console.log);

//merge is ideal for running lon operations in parallel


// Lesson 13 --- mergeMap. see coursedialogcomponent
// Lesson 14 --- exhaustMap. see coursedialogcomponent

// Lesson 15 --- unsubscribing to observables
// const interval1$ = interval(1000);
// const sub = interval1$.subscribe(console.log);

// setTimeout(() => {
//   sub.unsubscribe();
// }, 5000);

// Lesson 16 --- Lessons and Courses from backend logic. see courseComponent
// Lesson 17 --- TypeAhead logic and debounceTime operator. see courseComponent

// Lesson 18 --- switchMap Operator. see courseComponent

// Lesson 19 --- Error Handling. see home compoenent

// Lesson 20 --- Error Handling. see utils.ts
//Lesson 21 --- retryWhen() for errors. see home component
//Lesson 22 --- startWith Operator. see course component
}


}
