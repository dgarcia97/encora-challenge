import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { HomeService } from "../services/home.service";
import { catchError, Observable, of } from "rxjs";
import { PostModel } from "./models/post.model";
import { AsyncPipe, UpperCasePipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    MatCardModule,
    AsyncPipe,
    UpperCasePipe,
    MatProgressSpinnerModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeComponent implements OnInit {

  data$: Observable<PostModel[]>;

  constructor(private homeService: HomeService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.data$ = this.homeService.getPostsWithUsers()
      .pipe(
        catchError(() => {
          this.snackBar.open('Error while loading Posts!', '', {
            duration: 5000,
            panelClass: ['red-snackbar']
          })
          return of([]);
        })
      );
  }

}
