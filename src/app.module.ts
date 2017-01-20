import { NgModule }      from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent }  from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostComponent } from './post/post.component';
import { LoginGuard } from './login/login.guard';
import { LoginService } from './login/login.service';



const appRoutes: Routes = [
  { path: 'post',      component: PostComponent, canActivate: [LoginGuard] },
  {
    path: 'posts',
    component: PostListComponent,
    data: { title: 'latest posts' }
  },
  { path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/posts' }
];

@NgModule({
  imports:      [     RouterModule.forRoot(appRoutes),
                      BrowserModule,
                       FormsModule, 
                       ReactiveFormsModule,
                       HttpModule, 
                       JsonpModule 
                ],
  declarations: [ AppComponent,
                  PostListComponent,
                  PostComponent
                   
                  ],
  providers : [LoginGuard,LoginService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
