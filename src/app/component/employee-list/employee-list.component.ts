import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../modal/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule], // Importing CommonModule for using common directives (e.g., ngFor, ngIf)
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[] = []; // An array to store the list of employees

  // Inject EmployeeService to handle CRUD operations and Router for navigation
  constructor(private employeeService: EmployeeService, private router: Router) {}

  // On initialization, load the list of employees
  ngOnInit(): void {
    this.loadEmployees(); // Fetch employees from the server
  }

  // Method to fetch and load all employees using the service
  loadEmployees() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data; // Store the fetched employees into the employees array
    });
  }

  // Navigate to the employee form for adding a new employee
  addEmployee() {
    this.router.navigate(['/employee-form']); // Redirect to the employee form
  }

  // Navigate to the employee form for editing an existing employee
  editEmployee(employee: Employee) {
    alert(employee.id); // Show a simple alert with the employee ID for debugging
    // Using `skipLocationChange` to prevent URL change and then navigate to the edit form
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/employee-form/${employee.id}`]); // Redirect to the form with the employee ID
    });
  }

  // Delete an employee by ID after confirmation, then reload the employee list
  deleteEmployee(id: number) {
    if (confirm('Are you sure to delete this employee?')) { // Confirmation dialog
      this.employeeService.delete(id).subscribe(() => this.loadEmployees()); // Delete employee and refresh the list
    }
  }
}
