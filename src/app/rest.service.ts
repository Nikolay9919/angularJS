import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://api.github.com/';
  
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
 

  getUsers(): Observable<any> {
  return this.http.get(endpoint + 'users').pipe(
    map(this.extractData));
}

getUser(login): Observable<any> {
  return this.http.get(endpoint + 'users/' + login).pipe(
    map(this.extractData));
}

// addUser(login): Observable<any> {
//   console.log(login);
//   return this.http.post<any>(endpoint + 'usreventsucts', JSON.stringify(event), httpOptions).pipe(
//     tap((login) => console.log(`added ysers w/ id=${login.id}`)),
//     catchError(this.handleError<any>('addUsers'))
//   );
// }

// updateUser (id, login): Observable<any> {
//   return this.http.put(endpoint + 'users/' + id, JSON.stringify(login), httpOptions).pipe(
//     tap(_ => console.log(`updated user id=${id}`)),
//     catchError(this.handleError<any>('updateUser'))
//   );
// }

// deleteUser (login): Observable<any> {
//   return this.http.delete<any>(endpoint + 'events/' + login, httpOptions).pipe(
//     tap(_ => console.log(`deleted user login=${login}`)),
//     catchError(this.handleError<any>('deleteUser'))
//   );
// }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
