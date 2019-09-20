package id.cakra.tech.etftest.service;

import id.cakra.tech.etftest.service.dto.EtfHistoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.cakra.tech.etftest.domain.EtfHistory}.
 */
public interface EtfHistoryService {

    /**
     * Save a etfHistory.
     *
     * @param etfHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    EtfHistoryDTO save(EtfHistoryDTO etfHistoryDTO);

    /**
     * Get all the etfHistories.
     *
     * @return the list of entities.
     */
    List<EtfHistoryDTO> findAll();


    /**
     * Get the "id" etfHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EtfHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" etfHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
