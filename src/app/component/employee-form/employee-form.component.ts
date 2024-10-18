import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../modal/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  // Importing FormsModule to enable two-way data binding via [(ngModel)]
  imports: [FormsModule],
  providers: [RouterModule], // Providing RouterModule so routing functionality is available
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  // Storing the employee's ID if it's passed via the route, or null if it's a new employee
  employeeId: number | null = null;
  
  // Injecting required dependencies for routing and service access
  private route = inject(ActivatedRoute); // ActivatedRoute to access route parameters
  private router = inject(Router); // Router to navigate programmatically
  private employeeService = inject(EmployeeService); // EmployeeService to interact with API

  // Defining the employee model object
  employee: Employee = {
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: '',
    id: 0
  };

  constructor() { }

  ngOnInit(): void {
    // Extract employee ID from the route parameters if available
    this.employeeId = Number(this.route.snapshot.params['id']);

    // If there is an employeeId, fetch the employee details for editing
    if (this.employeeId) {
      this.employeeService.getById(this.employeeId).subscribe(employee => {
        this.employee = employee;
      });
    } else {
      // If no employeeId is found, reset the employee object to prepare for adding a new one
      this.employee = { name: '', email: '', phone: '', salary: 0, department: '', id: 0 };
    }
  }

  // Handles form submission for both creating and updating employee records
  onSubmit() {
    if (this.employeeId) {
      // If employeeId exists, update the existing employee
      this.employeeService.update(this.employeeId, this.employee).subscribe(() => 
        this.router.navigate(['/employees']) // Navigate back to the employee list after updating
      );
    } else {
      // If no employeeId, create a new employee
      this.employeeService.create(this.employee).subscribe(() => 
        this.router.navigate(['/employees']) // Navigate back to the employee list after creating
      );
    }
  }

}
