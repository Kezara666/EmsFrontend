import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../modal/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:7110/api/Employee'; // Base URL for API endpoints

  constructor(private http: HttpClient) { } // Inject HttpClient for making HTTP requests

  // Get all employees from the API
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`); // HTTP GET request to retrieve employee list
  }

  // Get a specific employee by ID
  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`); // HTTP GET request to retrieve an employee by ID
  }

  // Create a new employee
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, employee); // HTTP POST request to create an employee
  }

  // Update an existing employee by ID
  update(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, employee); // HTTP PUT request to update an employee by ID
  }

  // Delete an employee by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`); // HTTP DELETE request to remove an employee by ID
  }
}
