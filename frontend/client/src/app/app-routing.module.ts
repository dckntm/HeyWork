import { AdminPageComponent } from './pages/admin/admin-page/admin-page.component';
import { UsersComponent } from './pages/users-list/list/users/users.component';
import { PersonalPageComponent } from './pages/personal/personal-page/personal-page.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user/:id',
    component: PersonalPageComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
