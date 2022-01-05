import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from "../models/post";
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

   get getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(
      `${API_URL}/posts`
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(
      `${API_URL}/posts/${id}`
    );
  }

}
