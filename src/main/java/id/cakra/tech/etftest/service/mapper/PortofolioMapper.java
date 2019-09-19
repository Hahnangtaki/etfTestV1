package id.cakra.tech.etftest.service.mapper;

import id.cakra.tech.etftest.domain.*;
import id.cakra.tech.etftest.service.dto.PortofolioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Portofolio} and its DTO {@link PortofolioDTO}.
 */
@Mapper(componentModel = "spring", uses = {EtfProductMapper.class})
public interface PortofolioMapper extends EntityMapper<PortofolioDTO, Portofolio> {

    @Mapping(source = "etfProduct.id", target = "etfProductId")
    PortofolioDTO toDto(Portofolio portofolio);

    @Mapping(source = "etfProductId", target = "etfProduct")
    Portofolio toEntity(PortofolioDTO portofolioDTO);

    default Portofolio fromId(Long id) {
        if (id == null) {
            return null;
        }
        Portofolio portofolio = new Portofolio();
        portofolio.setId(id);
        return portofolio;
    }
}