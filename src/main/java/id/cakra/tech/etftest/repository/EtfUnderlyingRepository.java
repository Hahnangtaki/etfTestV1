package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.EtfUnderlying;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtfUnderlying entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtfUnderlyingRepository extends JpaRepository<EtfUnderlying, Long> {

}
