import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {CourseComponent} from "./course/course.component";
import { TestComponent } from './test/test/test.component';
import { RecieveComponent } from './reciever/recieve/recieve.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
      path: 'lessons-test',
      component: TestComponent
    },
    {
      path: 'reciever',
      component: RecieveComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: 'courses/:id',
        component: CourseComponent
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
