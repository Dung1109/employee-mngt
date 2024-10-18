package org.andy.employee_be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.andy.employee_be.entities.Account}
 */
@Value
public class AccountDto implements Serializable {
    @NotNull
    @Size(min = 4)
    @NotEmpty
    @NotBlank
    String account;
    @NotNull
    @Size(min = 4)
    @NotEmpty
    @NotBlank
    String password;
}