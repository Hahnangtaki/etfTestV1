package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.BankCustody;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BankCustody entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankCustodyRepository extends JpaRepository<BankCustody, Long> {

}
