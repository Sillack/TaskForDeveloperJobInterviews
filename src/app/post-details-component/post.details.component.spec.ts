import { Post } from '../models/post';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Comment } from '../models/comment';
import { BehaviorSubject } from 'rxjs';

describe('DetailedPostComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  const testCommentData = [{
    postId: 1,
    id: 1,
    name: 'testName',
    email: 'testEmail@email.com',
    body: 'testBody'
  }];
  const testPostData = {
    userId: 1,
    id: 1,
    title: 'testTitle',
    body: 'testBody'
  };
  const testCommentDataObs = new BehaviorSubject<Comment[]>(testCommentData);
  const testPostDataObs = new BehaviorSubject<Post>(testPostData);
  const mockCommentService = {
    getComments: () => {
      return testCommentDataObs.asObservable();
    }
  };

  const mockPostService = {
    getPost: () => {
      return testPostDataObs.asObservable();
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: PostService, useValue: mockPostService
        },
        {
          provide: CommentService, useValue: mockCommentService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should get comments and post data', () => {
      fixture.detectChanges();
      expect(component.commentsData).toBe(testCommentData);
      expect(component.post).toBe(testPostData);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should unsubscribe from the all subscriptions', () => {
      const subSpy = spyOn(component.subscriptions[0], 'unsubscribe');
      const subSpy2 = spyOn(component.subscriptions[1], 'unsubscribe');
      fixture.destroy();
      expect(subSpy).toHaveBeenCalledTimes(1);
      expect(subSpy2).toHaveBeenCalledTimes(1);
    });
  });

});
