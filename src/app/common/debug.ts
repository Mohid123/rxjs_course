import { Observable } from "rxjs"
import { tap } from 'rxjs/operators';

export enum RxJsLoggingLevel { //the states the app may be in
  TRACE,
  INFO,
  DEBUG,
  ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO; // a global logging level

export function setRxjsLoggingLevel(level: RxJsLoggingLevel) { //to modify global the logging level that allows the entire app to modify it based on app state
  rxjsLoggingLevel = level;
}

export const debug = (level: number, message: string) => { //Higher order function bcs it will be returning another function
  (source: Observable<any>) => source.pipe(
    tap(value => {
      if(level >= rxjsLoggingLevel) {
        console.log(message + ':', value);
      }
    })
  )

}

// This doesn't work properly
