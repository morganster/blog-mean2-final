import { Component } from '@angular/core';

import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'post-list',
  templateUrl: './public/app/post/post-list.component.html',
  providers:[PostService]
})
export class PostListComponent implements OnInit { 
    componentName : 'PostListComponent';
    posts : Post[];
    errorMsg : String;
    mode: 'Observable';
    constructor (private postService: PostService){ }

    ngOnInit() { this.getPost();}

    getPost(){
        this.postService.getPost()
            .subscribe(
                posts => this.posts = posts,
            error => this.errorMsg = <any>error);

            
    }
    loadingMessage = 'Loading Post...'; 
}
