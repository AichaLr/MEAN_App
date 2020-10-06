import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { ServiceService } from './service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CoursesAddComponent } from './components/courses-add/courses-add.component';
import { EssayComponent } from './components/essay/essay.component';

@NgModule({
  declarations: [AppComponent, CoursesListComponent, CoursesDetailsComponent, CoursesAddComponent, EssayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
