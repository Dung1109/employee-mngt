package org.andy.employee_be.controller;

import org.andy.employee_be.dto.AccountDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    Logger logger = Logger.getLogger(LoginController.class.getName());

    @PostMapping("/login")
    public String login(@RequestBody AccountDto accountDto) {
//        logger.info("Login request: " + accountDto);
        if (accountDto.getAccount().equals("admin") && accountDto.getPassword().equals("admin")) {
            return "Login success";
        } else {
            return "Login failed";
        }
    }
}
