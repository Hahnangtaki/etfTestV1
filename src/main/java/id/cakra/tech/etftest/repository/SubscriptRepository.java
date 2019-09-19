package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.Subscript;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subscript entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptRepository extends JpaRepository<Subscript, Long> {

}
