import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Comment} from "../models/comment";

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getCommentsByPostId(idPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${API_URL}/posts/${idPost}/comments`)
      .pipe(catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }));
  }
}
