import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Comment } from '../models/comment';
import {environment} from "../../environments/environment";

describe('CommentService', () => {
  const API_URL = `${environment.apiUrl}`;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let commentService: CommentService;
  const commentData: Comment[] = [
    {
      postId: 1,
      id: 1,
      name: 'test comment 1',
      email: 'testEmail1@email.com',
      body: 'test comment body 1',
    },
    {
      postId: 2,
      id: 2,
      name: 'test comment 2',
      email: 'testEmail2@email.com',
      body: 'test comment body 2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    commentService = new CommentService(httpClient);
  });

  describe('getComments', () => {
    it('returns the correct comments from the http.get request, with the correct query parameter in the url', () => {
      commentService.getCommentsByPostId(1).subscribe(posts => expect(posts).toEqual(commentData));

      httpTestingController.expectOne({
        url: `${API_URL}/posts/1/comments`,
        method: 'Get'
      }).flush(commentData);

      httpTestingController.verify();
    });


    it('Should catch 404 error', () => {
      commentService.getCommentsByPostId(1).subscribe({
          next: (data) => fail('Should have failed with 404 error'),
          error: (error: HttpErrorResponse) => {
            expect(error.status).toEqual(404);
            expect(error.error).toContain('404 error');
          }
        }
      );
      httpTestingController.expectOne({
        url: `${API_URL}/posts/1/comments`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });

  });
});

