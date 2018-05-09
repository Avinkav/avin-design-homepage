import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignPhilosophyComponent } from '../design-philosophy/design-philosophy.component';
import { HomeComponent } from '../home/home.component';
import { SkillsComponent } from '../skills/skills.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'design-philosophy', component: DesignPhilosophyComponent },
  { path: 'skill-set', component: SkillsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
