import { Observable } from "rxjs";
// our custom http observable

export function createHttpObservable(url: string) {
  return Observable.create(observer => { //initialize the creation of the observable

    const controller = new AbortController() //the abort controller is part of the fetch operator api. It allows us to unsubscribe from the request/response observavble
    const signal = controller.signal; //if signal is true, only then the fetch request will work. (like an if/else statement)

    fetch(url, {signal}) //the url for the response '/api/courses'
    .then(response => {
      if(response.ok) { //for error handling lesson 20
        return response.json() //show the response in json format
      }
      else {
        observer.error('Request Failed with status code: '+ response.status);

      }
    })
    .then(body => { //once the response body is received pass its value into the observable and complete it
      observer.next(body);
      observer.complete();
    })
    .catch(err => {
      observer.error(err); //in case na error occurs in the response
    })

    return () => controller.abort //abort or unsubscribe to the observable afte completion
  })
}
