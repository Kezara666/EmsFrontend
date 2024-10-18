import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';

export const routes: Routes = [
    { path: 'employees', component: EmployeeListComponent },
    { path: 'employee-form', component: EmployeeFormComponent },
    { path: 'employee-form/:id', component: EmployeeFormComponent },
    
];
