package id.cakra.tech.etftest.service;

import id.cakra.tech.etftest.service.dto.PortofolioDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.cakra.tech.etftest.domain.Portofolio}.
 */
public interface PortofolioService {

    /**
     * Save a portofolio.
     *
     * @param portofolioDTO the entity to save.
     * @return the persisted entity.
     */
    PortofolioDTO save(PortofolioDTO portofolioDTO);

    /**
     * Get all the portofolios.
     *
     * @return the list of entities.
     */
    List<PortofolioDTO> findAll();


    /**
     * Get the "id" portofolio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PortofolioDTO> findOne(Long id);

    /**
     * Delete the "id" portofolio.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
