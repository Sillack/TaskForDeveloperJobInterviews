import {Component, OnInit} from '@angular/core';
import {PostService} from "./services/post.service";
import {Observable} from "rxjs";
import {Posts} from "./models/Posts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Observable<Array<Posts>> | undefined

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}


