import { Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
    {path:'', redirectTo: 'employee', pathMatch: 'full'},
    {path:'add', component: AddEmployeeComponent},
    {path:'employee', component: EmployeesListComponent},
    {path: 'employees/:id', component: EmployeeDetailsComponent}
];
