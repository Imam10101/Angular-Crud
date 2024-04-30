import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [FormsModule,HttpClientModule,EmployeeDetailsComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {
  employee?: Employee[];
  currentEmployee: Employee = {};
  currentIndex = -1;
  name = '';
  constructor(private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.employeeService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
