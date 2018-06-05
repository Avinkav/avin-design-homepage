import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  posts: Post[] = [{
    Author: 'Avin Kavish',
    Title: `The Paradigm of Inversion of Control`,
    Content: `IoC is a design pattern in which program flow is 
    controlled by logic external to a programmer's logic, usually a framework.`,
    CreatedAt: new Date(),
    Tags: ['IoC', 'Design Pattern']
  }];

  constructor() { }

  public getPosts() {
    return of(this.posts);
  }

}
