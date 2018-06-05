import { Component, OnInit, Input } from '@angular/core';
import { MockService } from '../services/mock.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() display;

  posts: Post[];

  constructor(private mockService: MockService) { }

  ngOnInit() {
    switch (this.display) {
      case 'latest': {
        this.mockService.getPosts().subscribe(next => this.posts = next);
      }
    }

  }

}
