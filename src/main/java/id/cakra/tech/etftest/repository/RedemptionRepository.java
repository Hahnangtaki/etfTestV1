package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.Redemption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Redemption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RedemptionRepository extends JpaRepository<Redemption, Long> {

}
