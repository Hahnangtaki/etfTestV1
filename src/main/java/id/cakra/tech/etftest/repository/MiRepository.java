package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.Mi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MiRepository extends JpaRepository<Mi, Long> {

}
