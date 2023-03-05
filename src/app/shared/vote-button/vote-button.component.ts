import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  votePayload!: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;


upvotePost() {
throw new Error('Method not implemented.');
}
downvotePost() {
throw new Error('Method not implemented.');
}


  @Input() post!: PostModel;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService) { }

  ngOnInit(): void {
  }

}
