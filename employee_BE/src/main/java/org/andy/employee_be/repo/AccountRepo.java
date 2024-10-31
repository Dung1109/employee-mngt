package org.andy.employee_be.repo;

import jakarta.transaction.Transactional;
import org.andy.employee_be.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "accounts")
@CrossOrigin
public interface AccountRepo extends JpaRepository<Account, Integer> {

    List<Account> findAccountByAccountContainingIgnoreCase(@Param("account") String account);

    @Query(value = "SELECT * FROM ACCOUNT WHERE account = :account OR email = :email AND STATUS = :status", nativeQuery = true)
        // Optional<Account> findByAccountAndEmail(String account, String email, Integer status);
    Optional<Account> findByAccountAndEmail(@Param("account") String account, @Param("email") String email, @Param("status") Integer status);

    @Transactional
    void deleteAccountByEmployee_FirstName(String employeeId);
}
