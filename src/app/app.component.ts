import { Component, HostListener, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Subscription } from 'rxjs'

import { SpotifyParamType, SpotifyService } from './services/spotify.service'
import { WindowService } from './services/window.service'

@UntilDestroy()
@Component({
  selector: 'sthtr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Story Hunter';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowService.calculateSizes(event.target.innerWidth)
  }

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private windowService: WindowService
  ) {}

  public ngOnInit() {
    this.windowService.calculateSizes(window.innerWidth)
    let subscription: Subscription;
    subscription = this.route.fragment
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const paramList: any = {};
        params
          ?.split('&')
          .map((p) => p.split('='))
          .forEach((p) => {
            paramList[p[0]] = p[1];
          });
        if (this.spotifyService.authorize(paramList as SpotifyParamType)) {
          subscription?.unsubscribe();
        }
      });
  }
}
