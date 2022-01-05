import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Subscription} from "rxjs";
import {Post} from "../models/post";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/comment";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})

export class PostDetailsComponent implements OnInit, OnDestroy {
  postId: number;
  subscriptions: Subscription[] = [];
  post: Post;
  commentsData: Array<Comment>;

  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getCommentsForPost();
    this.getPost();
  }

  getPost(): void {
    this.subscriptions.push(this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
    }));
  }

  getCommentsForPost(): void {
    this.subscriptions.push(this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.commentsData = comments;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}


