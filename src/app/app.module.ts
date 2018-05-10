import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'bootstrap';
import { AppComponent } from './app.component';
import { DesignPhilosophyComponent } from './design-philosophy/design-philosophy.component';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  declarations: [
    AppComponent,
    DesignPhilosophyComponent,
    HomeComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    RoutesRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
