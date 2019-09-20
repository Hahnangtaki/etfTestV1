package id.cakra.tech.etftest.service.mapper;

import id.cakra.tech.etftest.domain.*;
import id.cakra.tech.etftest.service.dto.EtfExecutionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link EtfExecution} and its DTO {@link EtfExecutionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EtfExecutionMapper extends EntityMapper<EtfExecutionDTO, EtfExecution> {


    @Mapping(target = "etfExecutionDtls", ignore = true)
    @Mapping(target = "removeEtfExecutionDtl", ignore = true)
    EtfExecution toEntity(EtfExecutionDTO etfExecutionDTO);

    default EtfExecution fromId(Long id) {
        if (id == null) {
            return null;
        }
        EtfExecution etfExecution = new EtfExecution();
        etfExecution.setId(id);
        return etfExecution;
    }
}
