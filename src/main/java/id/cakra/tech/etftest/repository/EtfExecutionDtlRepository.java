package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.EtfExecutionDtl;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtfExecutionDtl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtfExecutionDtlRepository extends JpaRepository<EtfExecutionDtl, Long> {

}
