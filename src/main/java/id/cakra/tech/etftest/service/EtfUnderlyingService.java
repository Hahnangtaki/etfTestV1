package id.cakra.tech.etftest.service;

import id.cakra.tech.etftest.service.dto.EtfUnderlyingDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.cakra.tech.etftest.domain.EtfUnderlying}.
 */
public interface EtfUnderlyingService {

    /**
     * Save a etfUnderlying.
     *
     * @param etfUnderlyingDTO the entity to save.
     * @return the persisted entity.
     */
    EtfUnderlyingDTO save(EtfUnderlyingDTO etfUnderlyingDTO);

    /**
     * Get all the etfUnderlyings.
     *
     * @return the list of entities.
     */
    List<EtfUnderlyingDTO> findAll();


    /**
     * Get the "id" etfUnderlying.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EtfUnderlyingDTO> findOne(Long id);

    /**
     * Delete the "id" etfUnderlying.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
