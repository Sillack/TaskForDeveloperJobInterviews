import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Posts} from "../models/Posts";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Comments} from "../models/Comments";

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getCommentsByPostId(idPost: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(
      `${API_URL}/posts/${idPost}/comments`)
      .pipe(catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }));
  }
}
