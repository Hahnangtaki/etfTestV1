package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.GlobalParameter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GlobalParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GlobalParameterRepository extends JpaRepository<GlobalParameter, Long> {

}
