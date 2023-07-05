import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  
  { path: 'staff', component: StaffComponent },
  { path: 'task', component: TaskComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
