import { Injectable } from '@angular/core';
import { Course } from './Models/course';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  // Get all students
  /*getCourses() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get student
  GetCourse(id): Observable<any> {
    let API_URL = `${this.endpoint}/read/${id}`;
    return this.http.get(API_URL).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }

  // Update student
  UpdateStudent(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data).pipe();
  }

  // Delete student
  DeleteStudent(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/${id}`;
    return this.http.delete(API_URL).pipe();
  }*/
  create(data, file): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('titre', data.titre);
    formData.append('categorie', data.categorie);
    formData.append('description', data.description);
    //formData.append('data', data);
    const req = new HttpRequest('POST', `${this.endpoint}cours`, formData, {
      reportProgress: true,
    });
    //return this.http.post(`${this.endpoint}cours`, data);
    return this.http.request(req);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.endpoint}courses/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.endpoint}courses`);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.endpoint}delete/${id}`);
  }
  update(id, data): Observable<any> {
    return this.http.put(`${this.endpoint}update/${id}`, data);
  }
  findByTitle(title): Observable<any> {
    return this.http.get(`${this.endpoint}find/${title}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.endpoint);
  }
  /*getProductList(): Observable<Course[]> {
    return this.http
      .get<GetResponse>(this.endpoint)
      .pipe(map((response) => response._embedded.courses));
  }
}

interface GetResponse {
  _embedded: {
    courses: Course[];
  };*/
}
