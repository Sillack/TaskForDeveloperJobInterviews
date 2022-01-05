import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Subscription} from "rxjs";
import {Post} from "../models/post";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnDestroy {
  posts: Array<Post>;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.subscription = this.postService.getPosts.subscribe(postsData => {
      this.posts = postsData;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


