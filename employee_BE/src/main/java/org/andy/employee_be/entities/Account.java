package org.andy.employee_be.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.andy.employee_be.enums.Status;

@Getter
@Setter
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "account", unique = true)
    private String account;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated
    @Column(name = "status", nullable = false)
    private Status status;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

}