import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css'],
})
export class CoursesAddComponent implements OnInit {
  course = {
    titre: '',
    categorie: '',
    description: '',
    img: '',
  };
  submitted = false;
  galleryForm: FormGroup;
  images: File = null;

  constructor(
    private tutorialService: ServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  selectimage(files: File) {
    this.images = files[0];
  }

  saveTutorial(): void {
    const data = {
      titre: this.course.titre,
      categorie: this.course.categorie,
      description: this.course.description,
      img: this.course.img,
    };
    this.tutorialService.create(data, this.images).subscribe(
      (response) => {
        // console.log(this.imageFile);
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
        console.log('add marahach takhdem');
      }
    );
  }

  newTutorial(): void {
    this.submitted = false;
    this.course = {
      titre: '',
      categorie: '',
      description: '',
      img: '',
    };
  }
}
