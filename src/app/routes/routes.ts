import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignPhilosophyComponent } from '../design-philosophy/design-philosophy.component';
import { HomeComponent } from '../home/home.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ItemComponent } from '../portfolio/item/item.component';
import { EditorComponent } from '../editor/editor.component';
import { OnePageComponent } from '../one-page/one-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: OnePageComponent },
  { path: 'projects', component: PortfolioComponent, children: [
    { path: ':id', component: ItemComponent },

  ]},
  { path: 'editor', component: EditorComponent },
  //{ path: 'design-philosophy', component: DesignPhilosophyComponent },
  //{ path: 'skill-set', component: SkillsComponent },
];

