import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NonAuthorizedGuard } from "./auth/guards/non-authorized.guard";

const routes: Routes = [
    { 
        path:'courses',
        canLoad: [AuthorizedGuard],
        loadChildren: () => import("./features/course/course.module").then(m => m.CourseModule)
    },
    { 
        path:'login',
        canActivate: [NonAuthorizedGuard],
        loadChildren: () => import("./features/login/login.module").then(m => m.LoginModule)
    },
    { 
        path:'registration',
        canActivate: [NonAuthorizedGuard],
        loadChildren: () => import("./features/registration/registration.module").then(m => m.RegistrationModule)
    },
    {
        path: '',
        canLoad: [AuthorizedGuard],
        redirectTo: '/courses',
        pathMatch: 'full',
        
    },
    {
        path: '**',
        canLoad: [AuthorizedGuard],
        redirectTo: '/courses',
        pathMatch: 'full'
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }