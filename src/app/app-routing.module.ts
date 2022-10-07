import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SearchComponent } from './pages/search/search.page'

const routes: Routes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
