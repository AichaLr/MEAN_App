import { Component, OnInit } from '@angular/core';
import {
  TokenPayload,
  AuthenticationService,
} from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.css'],
})
export class EssayComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
