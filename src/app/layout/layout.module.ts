import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "task",
        loadChildren: () => import('../task/task.module').then(m => m.TaskModule)
      },
      {
        path: "batch",
        loadChildren: () => import('../batch/batch.module').then(m => m.BatchModule)
      }
    ]
  }
]

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutModule { }
