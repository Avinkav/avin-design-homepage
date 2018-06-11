import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DesignPhilosophyComponent } from './design-philosophy/design-philosophy.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ListComponent } from './list/list.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { ItemComponent } from './portfolio/item/item.component';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'bootstrap';
import { OnePageComponent } from './one-page/one-page.component';
import { CoverComponent } from './one-page/cover/cover.component';
import { GmsComponent } from './one-page/gms/gms.component';
import { OnePageDirective } from './directives/one-page.directive';
import { OnePageSectionDirective } from './directives/one-page-section.directive';
import { OnePageDownDirective } from './directives/one-page-down.directive';
import { OnePageUpDirective } from './directives/one-page-up.directive';
import { routes } from './routes/routes';
import { RouterModule } from '@angular/router';
import { OnePageNavDirective } from './directives/one-page-nav.directive';
import { OnePageNavComponent } from './one-page-nav/one-page-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DesignPhilosophyComponent,
    HomeComponent,
    SkillsComponent,
    PortfolioComponent,
    ListComponent,
    SafeHTMLPipe,
    ItemComponent,
    EditorComponent,
    OnePageComponent,
    CoverComponent,
    GmsComponent,
    OnePageDirective,
    OnePageSectionDirective,
    OnePageDownDirective,
    OnePageUpDirective,
    OnePageNavDirective,
    OnePageNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    QuillModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
