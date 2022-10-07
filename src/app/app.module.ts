import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor'
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor'
import { SearchComponent } from './pages/search/search.page'
import { DurationPipe } from './ui/pipes/track.pipe'
import { PropertiesComponent } from './ui/properties/properties.component'
import { SearchBoxComponent } from './ui/search-box/search-box.component'
import { SearchResultItemComponent } from './ui/search-result/search-result-item/search-result-item.component'
import { SearchResultComponent } from './ui/search-result/search-result.component'
import { AlbumComponent } from './ui/selected-item/album/album.component'
import { ArtistComponent } from './ui/selected-item/artist/artist.component'
import { HeaderComponent } from './ui/selected-item/header/header.component'
import { TrackComponent } from './ui/selected-item/track/track.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBoxComponent,
    SearchResultComponent,
    SearchResultItemComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
    HeaderComponent,
    PropertiesComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
    [{ provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
