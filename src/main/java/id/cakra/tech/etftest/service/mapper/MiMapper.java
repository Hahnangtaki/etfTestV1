package id.cakra.tech.etftest.service.mapper;

import id.cakra.tech.etftest.domain.*;
import id.cakra.tech.etftest.service.dto.MiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Mi} and its DTO {@link MiDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MiMapper extends EntityMapper<MiDTO, Mi> {


    @Mapping(target = "etfProducts", ignore = true)
    @Mapping(target = "removeEtfProduct", ignore = true)
    Mi toEntity(MiDTO miDTO);

    default Mi fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mi mi = new Mi();
        mi.setId(id);
        return mi;
    }
}
