import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../models/post';
import {environment} from "../../environments/environment";

describe('PostService', () => {
  const API_URL = `${environment.apiUrl}`;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let postService: PostService;
  const postData: Post[] = [
    {
      userId: 1,
      id: 1,
      title: 'Test Title 1',
      body: 'Test body 1'
    },
    {
      userId: 2,
      id: 2,
      title: 'Test Title 2',
      body: 'Test body 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    postService = new PostService(httpClient);
  });

  describe('getPosts', () => {
    it('returns the correct posts from the http.get request', () => {
      postService.getPosts.subscribe(posts => expect(posts).toEqual(postData));
      httpTestingController.expectOne({
        url: `${API_URL}/posts`,
        method: 'Get'
      }).flush(postData);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.getPosts.subscribe({
          next: (data) => fail('Should have failed with 404 error'),
          error: (error: HttpErrorResponse) => {
            expect(error.status).toEqual(404);
            expect(error.error).toContain('404 error');
          }
        }
      );
      httpTestingController.expectOne({
        url: `${API_URL}/posts`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPost', () => {
    it('returns the correct posts from the http.get request', () => {
      postService.getPostById(1).subscribe(post => expect(post).toEqual(postData[0]));
      httpTestingController.expectOne({
        url: `${API_URL}/posts/1`,
        method: 'Get'
      }).flush(postData[0]);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.getPostById(1).subscribe({
          next: (data) => fail('Should have failed with 404 error'),
          error: (error: HttpErrorResponse) => {
            expect(error.status).toEqual(404);
            expect(error.error).toContain('404 error');
          }
        }
    );

      httpTestingController.expectOne({
        url: `${API_URL}/posts/1`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });

  });
});
