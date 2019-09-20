package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.EtfExecution;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtfExecution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtfExecutionRepository extends JpaRepository<EtfExecution, Long> {

}
