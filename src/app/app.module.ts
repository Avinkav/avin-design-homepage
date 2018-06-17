import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OnePageComponent } from './one-page/one-page.component';
import { OnePageDirective } from './directives/one-page.directive';
import { OnePageSectionDirective } from './directives/one-page-section.directive';
import { OnePageDownDirective } from './directives/one-page-down.directive';
import { OnePageUpDirective } from './directives/one-page-up.directive';
import { RouterModule, Routes } from '@angular/router';
import { OnePageNavDirective } from './directives/one-page-nav.directive';
import { OnePageNavComponent } from './one-page-nav/one-page-nav.component';
import { CoverComponent } from './one-page/cover/cover.component';
import { GmsComponent } from './one-page/gms/gms.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel/carousel-item.directive';
import { CarouselDirective } from './carousel/carousel.directive';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: OnePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    GmsComponent,
    OnePageComponent,
    OnePageDirective,
    OnePageSectionDirective,
    OnePageDownDirective,
    OnePageUpDirective,
    OnePageNavDirective,
    OnePageNavComponent,
    SafeHTMLPipe,
    CarouselComponent,
    CarouselItemDirective,
    CarouselDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

