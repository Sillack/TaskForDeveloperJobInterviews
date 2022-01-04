import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Observable} from "rxjs";
import {Posts} from "../models/Posts";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Observable<Array<Posts>> | undefined

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}


