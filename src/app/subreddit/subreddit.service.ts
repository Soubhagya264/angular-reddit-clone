import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SubredditModel } from './subreddit-response';
@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(private http:HttpClient) { }
  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/getAll');
  }
  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>('http://localhost:8080/api/subreddit/create',
      subredditModel);
  }
}
