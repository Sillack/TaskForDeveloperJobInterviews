import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Posts} from "../models/Posts";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getPosts(): Observable<Array<Posts>> {
    return this.http.get<Array<Posts>>(
      `${API_URL}/posts`
    );
  }

  getPostById(id: number): Observable<Posts> {
    return this.http.get<Posts>(
      `${API_URL}/posts/${id}`
    );
  }

}
