package org.andy.employee_be.controller;

import jakarta.validation.Valid;
import org.andy.employee_be.dto.AccountDto;
import org.andy.employee_be.dto.EmployeeDto;
import org.andy.employee_be.entities.Account;
import org.andy.employee_be.entities.Employee;
import org.andy.employee_be.repo.AccountRepo;
import org.andy.employee_be.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    Logger logger = Logger.getLogger(LoginController.class.getName());

    @Autowired
    AccountRepo accountRepo;

    @Autowired
    EmployeeRepo employeeRepo;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AccountDto accountDto) {
//        logger.info("Login request: " + accountDto);
        if (accountDto.getAccount().equals("admin") && accountDto.getPassword().equals("admin")) {
            return ResponseEntity.ok("Login success");
        } else {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }

    @DeleteMapping("/account/delete")
    public ResponseEntity deleteAccountByEmployeeId(@RequestParam String employeeId) {
        accountRepo.deleteAccountByEmployee_FirstName(employeeId);
        return ResponseEntity.ok("Account deleted");
    }

    @PostMapping("/employee")
    public ResponseEntity createEmployee(@RequestBody EmployeeDto employeeDto) {
        Employee employee = employeeRepo.save(Employee.builder()
                .firstName(employeeDto.getFirstName())
                .lastName(employeeDto.getLastName())
                .gender(employeeDto.getGender())
                .dateOfBirth(employeeDto.getDateOfBirth())
                .phone(employeeDto.getPhone())
                .address(employeeDto.getAddress())
                .departmentName(employeeDto.getDepartmentName())
                .remark(employeeDto.getRemark())
                .build());

        accountRepo.save(Account.builder()
                .account(employeeDto.getAccount())
                .email(employeeDto.getAccount())
                .password(employeeDto.getPassword())
                .status(employeeDto.getStatus())
                .employee(employee)
                .build());

        return ResponseEntity.ok(employee);
    }
}
