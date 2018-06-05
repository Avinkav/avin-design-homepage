import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignPhilosophyComponent } from '../design-philosophy/design-philosophy.component';
import { HomeComponent } from '../home/home.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ItemComponent } from '../portfolio/item/item.component';
import { EditorComponent } from '../editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent, children: [
    { path: ':id', component: ItemComponent },

  ]},
  { path: 'editor', component: EditorComponent },
  //{ path: 'design-philosophy', component: DesignPhilosophyComponent },
  //{ path: 'skill-set', component: SkillsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
