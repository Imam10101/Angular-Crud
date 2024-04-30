import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent {
  employee: Employee = {
    Name: '',
    Email: '',
    Mobile: '',
    Birthday: undefined,
    JoinDate: undefined
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) { }
  
  saveEmployee(): void {
    const data = {
      Name: this.employee.Name,
      Email: this.employee.Email,
      Mobile: this.employee.Mobile,
      Birthday: this.employee.Birthday,
      JoinDate: this.employee.JoinDate
    };
  
    this.employeeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  
  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      Name: '',
      Email: '',
      Mobile: '',
      Birthday: undefined,
      JoinDate: undefined
    };
  } 
}