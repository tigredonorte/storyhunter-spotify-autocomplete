import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface SpotifyParamType {
  access_token: string;
  expires_in: string;
  state: string;
}

@Injectable({ providedIn: 'root' })
export class WindowService {
  private sizes = new BehaviorSubject({
    'for-phone-only': false,
    'for-tablet-portrait-up': false,
    'for-tablet-portrait-down': false,
    'for-tablet-landscape-up': false,
    'for-tablet-landscape-down': false,
    'for-desktop-up': false,
    'for-desktop-down': false,
    'for-big-desktop-up': false,
    'for-big-desktop-down': false,
  })

  public calculateSizes = (width: number) => {
    const sizes = {
      'for-phone-only': width <= 599,
      'for-tablet-portrait-up': width >= 600,
      'for-tablet-portrait-down': width <= 599,
      'for-tablet-landscape-up': width >= 900,
      'for-tablet-landscape-down': width >= 899,
      'for-desktop-up': width >= 1200,
      'for-desktop-down': width >= 1199,
      'for-big-desktop-up': width >= 1800,
      'for-big-desktop-down': width >= 1799,
    }
    if (sizes === this.sizes.value) {
      return;
    }
    this.sizes.next(sizes);
  }

  public getSize$ = () => this.sizes.asObservable();

  // @ts-ignore
  public getSize = (sizeName?: string) => sizeName ? this.sizes.value[sizeName] : this.sizes.value;
}

