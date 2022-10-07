import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

export interface SpotifyParamType {
  access_token: string;
  expires_in: string;
  state: string;
}

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private pageSize = 10;

  constructor(private http: HttpClient) {}

  public getTrack(id: string): Observable<any> {
    if (id === '') {
      return new BehaviorSubject({}).asObservable()
    }
    const url = `${environment.spotifyUrl}tracks/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  public getArtist(id: string): Observable<any> {
    if (id === '') {
      return new BehaviorSubject({}).asObservable()
    }
    const url = `${environment.spotifyUrl}artists/${id}/albums`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  public getAlbum(id: string): Observable<any> {
    if (id === '') {
      return new BehaviorSubject({}).asObservable()
    }
    const url = `${environment.spotifyUrl}albums/${id}/tracks`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  public search(str: string, page = 0): Observable<any> {
    if (str === '') {
      return new BehaviorSubject({}).asObservable();
    }
    const options = [
      `q=${str}`,
      'type=album,artist,track',
      'include_external=audio',
      `limit=${this.pageSize}`,
      `offset=${this.pageSize * page}`,
    ];
    const url = `${environment.spotifyUrl}search?${options.join('&')}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  private getHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authorize()
    }
    return new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
  };

  public authorize(params?: SpotifyParamType): boolean {
    if (this.authorized()) {
      return true;
    }

    let state = localStorage.getItem('state');
    if (!state) {
      return this.redirectToSpotify();
    }

    if (params?.state !== state) {
      return false;
    }

    return this.getToken(params.access_token);
  }

  public authorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private redirectToSpotify = () => {
    const state = this.makeId(16);
    localStorage.setItem('state', state);
    const url =
      `https://accounts.spotify.com/authorize?` +
      [
        `response_type=token`,
        `client_id=${environment.clientId}`,
        `redirect_uri=${environment.redirectUri}`,
        `state=${state}`,
      ].join('&');
    window.open(url, '_self');
    return false;
  };

  private getToken = (token: string) => {
    localStorage.removeItem('state');
    localStorage.setItem('token', token);
    return true;
  };

  private makeId(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
