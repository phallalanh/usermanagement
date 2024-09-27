import { NgModule } from '@angular/core';

// Components
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guard/guard.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: "",
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./shared/modules/dashboard-module.module').then(m => m.DashboardModuleModule)
      }
    ]
  },

  { path: '**', component: NotfoundComponent, }// Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
