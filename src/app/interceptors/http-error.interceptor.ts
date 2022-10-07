import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError, timer } from 'rxjs'
import { catchError, take } from 'rxjs/operators'
import { SpotifyService } from '../services/spotify.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spotifyService: SpotifyService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!localStorage.getItem('too_many')) {
      return throwError(() => new Error('Too many requests, wait 30 seconds!'))
    }
    return next.handle(request)
      .pipe(
        catchError ((error: HttpErrorResponse) => {
          switch(error.status) {
            case 401: {
              localStorage.clear()
              this.spotifyService.authorize()
              break;
            }
            case 429: {
              localStorage.setItem('too_many', '1');
              timer(30000).pipe(take(1)).subscribe(() => {
                localStorage.removeItem('too_many');
              })
              alert(`Too many requests, wait 30 seconds!`)
              break;
            }
          }
          return throwError(() => new Error(error.error));
        })
      );
  }
}
