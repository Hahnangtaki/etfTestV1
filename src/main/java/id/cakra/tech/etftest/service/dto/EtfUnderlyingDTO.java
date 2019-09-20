package id.cakra.tech.etftest.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.cakra.tech.etftest.domain.EtfUnderlying} entity.
 */
public class EtfUnderlyingDTO implements Serializable {

    private Long id;

    private LocalDate effectiveDate;

    private Boolean active;


    private Long etfProductId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getEtfProductId() {
        return etfProductId;
    }

    public void setEtfProductId(Long etfProductId) {
        this.etfProductId = etfProductId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EtfUnderlyingDTO etfUnderlyingDTO = (EtfUnderlyingDTO) o;
        if (etfUnderlyingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etfUnderlyingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EtfUnderlyingDTO{" +
            "id=" + getId() +
            ", effectiveDate='" + getEffectiveDate() + "'" +
            ", active='" + isActive() + "'" +
            ", etfProduct=" + getEtfProductId() +
            "}";
    }
}
