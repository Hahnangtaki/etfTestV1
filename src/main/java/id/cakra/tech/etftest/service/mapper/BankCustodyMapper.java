package id.cakra.tech.etftest.service.mapper;

import id.cakra.tech.etftest.domain.*;
import id.cakra.tech.etftest.service.dto.BankCustodyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link BankCustody} and its DTO {@link BankCustodyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BankCustodyMapper extends EntityMapper<BankCustodyDTO, BankCustody> {


    @Mapping(target = "etfProducts", ignore = true)
    @Mapping(target = "removeEtfProduct", ignore = true)
    BankCustody toEntity(BankCustodyDTO bankCustodyDTO);

    default BankCustody fromId(Long id) {
        if (id == null) {
            return null;
        }
        BankCustody bankCustody = new BankCustody();
        bankCustody.setId(id);
        return bankCustody;
    }
}
