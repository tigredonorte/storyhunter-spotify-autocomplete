import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method !== "GET") {
      return next.handle(req)
    }
    const cachedResponse = localStorage.getItem(req.url)
    try {
      if(cachedResponse) {
        const resp = new HttpResponse<any>(JSON.parse(cachedResponse));
        return of(resp.clone())
      }
    } catch (error) {
      console.warn('error retrieving cache')
    }
    return next.handle(req).pipe(
      map(stateEvent => {
        if(stateEvent instanceof HttpResponse) {
          localStorage.setItem(req.url, JSON.stringify(stateEvent))
        }
        return stateEvent;
      })
    )
  }
}
