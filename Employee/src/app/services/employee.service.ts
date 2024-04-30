import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';


const baseUrl = 'https://localhost:7013/api/Employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(baseUrl);
  }

  get(id: any): Observable<Employee> {
    return this.http.get<Employee>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}?title=${title}`);
  }
}


