import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { CardComponent } from '../card/card.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'card', pathMatch: 'full' },
      { path: 'card', component: CardComponent },
      {
        path: 'user',
        loadChildren: () => import('./user-module.module').then(m => m.UserModuleModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./role-module.module').then(m => m.RoleModuleModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission-module.module').then(m => m.PermissionModuleModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./department-module.module').then(m => m.DepartmentModuleModule)
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModuleModule { }
