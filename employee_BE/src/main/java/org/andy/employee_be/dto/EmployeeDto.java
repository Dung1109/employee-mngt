package org.andy.employee_be.dto;

import lombok.Value;
import org.andy.employee_be.enums.Gender;
import org.andy.employee_be.enums.Status;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link org.andy.employee_be.entities.Employee}
 */
@Value
public class EmployeeDto implements Serializable {
    String firstName;
    String lastName;
    Gender gender;
    LocalDate dateOfBirth;
    String phone;
    String address;
    String departmentName;
    String remark;
    String account;
    String password;
    Status status;

}