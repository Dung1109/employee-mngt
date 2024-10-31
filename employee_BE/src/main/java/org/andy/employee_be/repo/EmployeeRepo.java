package org.andy.employee_be.repo;

import org.andy.employee_be.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "employees")
@CrossOrigin
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
}
