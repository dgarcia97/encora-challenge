import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, zip } from "rxjs";
import { PostModel } from "../home/models/post.model";
import { environment } from "../../environments/environment";
import { UserModel } from "../home/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.httpService.get<PostModel[]>(environment.posts);
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpService.get<UserModel[]>(environment.users);
  }

  getPostsWithUsers(): Observable<PostModel[]> {
    return zip(this.getPosts(), this.getUsers())
      .pipe(
        map( response => {
          const users = response[1] || [];
          const posts = response[0] || [];

          posts.forEach(post => post.user = users.find(user => user.id === post.id));

          return posts;
        })
      );
  }
}
