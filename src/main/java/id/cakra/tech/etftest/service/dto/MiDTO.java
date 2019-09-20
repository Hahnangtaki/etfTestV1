package id.cakra.tech.etftest.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.cakra.tech.etftest.domain.Mi} entity.
 */
public class MiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 10)
    private String miCode;

    @Size(max = 100)
    private String miName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMiCode() {
        return miCode;
    }

    public void setMiCode(String miCode) {
        this.miCode = miCode;
    }

    public String getMiName() {
        return miName;
    }

    public void setMiName(String miName) {
        this.miName = miName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MiDTO miDTO = (MiDTO) o;
        if (miDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), miDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MiDTO{" +
            "id=" + getId() +
            ", miCode='" + getMiCode() + "'" +
            ", miName='" + getMiName() + "'" +
            "}";
    }
}