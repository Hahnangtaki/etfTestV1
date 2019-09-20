package id.cakra.tech.etftest.repository;
import id.cakra.tech.etftest.domain.Portofolio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Portofolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortofolioRepository extends JpaRepository<Portofolio, Long> {

}
