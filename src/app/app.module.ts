import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DesignPhilosophyComponent } from './design-philosophy/design-philosophy.component';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import 'bootstrap';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    DesignPhilosophyComponent,
    HomeComponent,
    SkillsComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    RoutesRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
