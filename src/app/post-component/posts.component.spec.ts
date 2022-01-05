import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from '../services/post.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';

describe('PostsComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  const testPostData = [
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

  const testPostDataObs = new BehaviorSubject<Post[]>(testPostData);
  const mockPostService = {
    getPosts: testPostDataObs.asObservable(),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: PostService, useValue: mockPostService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should return the relevant posts ', () => {
      fixture.detectChanges();
      expect(component.posts).toBe(testPostData);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should unsubscribe from the subscription', () => {
      const subSpy = spyOn(component.subscription, 'unsubscribe');
      fixture.destroy();
      expect(subSpy).toHaveBeenCalledTimes(1);
    });
  });

});
