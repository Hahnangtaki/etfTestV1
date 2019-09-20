package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.EtfHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EtfHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtfHistoryRepository extends JpaRepository<EtfHistory, Long> {

}
