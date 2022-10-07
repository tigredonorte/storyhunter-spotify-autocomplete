import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SearchComponent } from './pages/search/search.page'
import { SearchBoxComponent } from './ui/search-box/search-box.component'
import { SearchResultComponent } from './ui/search-result/search-result.component';
import { SearchResultItemComponent } from './ui/search-result/search-result-item/search-result-item.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBoxComponent,
    SearchResultComponent,
    SearchResultItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
