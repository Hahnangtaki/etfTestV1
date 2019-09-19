package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.EtfUnderlyingDtl;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtfUnderlyingDtl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtfUnderlyingDtlRepository extends JpaRepository<EtfUnderlyingDtl, Long> {

}
