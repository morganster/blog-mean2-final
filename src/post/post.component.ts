import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from './post.service';

@Component({
  selector: 'post',
  templateUrl: './public/app/post/post.component.html',
  providers:[PostService]
})
export class PostComponent { 

      constructor (private fb: FormBuilder,private postService:PostService,private router:Router){ }

   public postForm = this.fb.group({
    title:["",Validators.required],
    body:["",Validators.required]
  });
  public errorMessage = "";
    createPost(event){
      this.postService.postPost(this.postForm.value.title,this.postForm.value.body).subscribe(
      result => {
      console.log(result);
      if (result) {
        this.router.navigate(['/']);
      }else{
        this.errorMessage = "bad credentials";
      }
    },
    error => this.errorMessage = <any>error
    );
    }

}
