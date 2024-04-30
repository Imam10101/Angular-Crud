import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  @Input() viewMode = false;

  @Input() currentEmployee: Employee = {
    Name: '',
    Email: '',
    Mobile: '',
    Birthday: undefined,
    JoinDate: undefined
  };
  message = '';

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getEmployee(this.route.snapshot.params["id"]);
    }
  }

  getEmployee(id: string): void {
    this.empService.get(id)
      .subscribe({
        next: (data) => {
          this.currentEmployee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(): void {
    const data = {
      Name: this.currentEmployee.Name,
      Email: this.currentEmployee.Email,
      Mobile: this.currentEmployee.Mobile,
      Birthday: this.currentEmployee.Birthday,
      JoinDate: this.currentEmployee.JoinDate,
     
    };
  
    this.empService.update(this.currentEmployee.Id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          
        },
        error: (e) => console.error(e)
      });
  }
  

  updateEmployee(): void {
    this.message = '';

    this.empService.update(this.currentEmployee.Id, this.currentEmployee)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteEmployee(): void {
    this.empService.delete(this.currentEmployee.Id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }
}