import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[];
  currentTutorial = null;
  title = '';
  i = 0;
  constructor(
    private productService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.productService.getAll().subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  modifier(tutorial) {
    console.log(tutorial._id);
    this.router.navigate(['/courses', tutorial._id]);
  }

  supprimer(tutorial) {
    console.log(tutorial._id);
    this.router.navigate(['/courses', tutorial._id]);
  }

  deleteTutorial(course: any): void {
    course._id = this.currentTutorial._id;
    this.productService.delete(course._id).subscribe(
      (response) => {
        console.log(response);
        // course = response;
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeAllTutorials(): void {
    this.productService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retrieveTutorials();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchTitle(): void {
    this.productService.findByTitle(this.title).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
