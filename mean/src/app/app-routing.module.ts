import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CoursesAddComponent } from './components/courses-add/courses-add.component';
import { EssayComponent } from './components/essay/essay.component';

const routes: Routes = [
  { path: 'courses/:id', component: CoursesDetailsComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'register', component: EssayComponent },
  { path: 'cours', component: CoursesAddComponent },

  { path: 'list', component: CoursesListComponent },
  //{ path: 'course/:id', component: CoursesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
