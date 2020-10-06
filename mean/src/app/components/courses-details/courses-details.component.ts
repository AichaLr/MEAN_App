import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.css'],
})
export class CoursesDetailsComponent implements OnInit {
  constructor(
    private productService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // courses: Course[];
  currentTutorial = null;
  ngOnInit(): void {
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id): void {
    this.productService.get(id).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.productService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  update(course: any) {
    course._id = this.currentTutorial._id;
    console.log('id:' + course._id);
    console.log('id:' + course.titre);
    console.log('id:' + course.categorie);
    this.productService.update(course._id, course).subscribe((res) => {
      console.log(res + 'updated ');
      course = res;
      this.router.navigate(['/list']);
    });
  }

  deleteTutorial(course: any): void {
    course._id = this.currentTutorial._id;
    this.productService.delete(course._id).subscribe(
      (response) => {
        console.log(response);
        // course = response;
        this.router.navigate(['/list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
