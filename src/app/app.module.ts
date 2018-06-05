import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DesignPhilosophyComponent } from './design-philosophy/design-philosophy.component';
import { RoutesRoutingModule } from './routes/routes-routing.module';
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
    EditorComponent
  ],
  imports: [
    BrowserModule,
    RoutesRoutingModule,
    NgbModule.forRoot(),
    QuillModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
