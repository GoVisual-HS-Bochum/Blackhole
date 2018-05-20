package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Raum.
 */
@Entity
@Table(name = "raum")
public class Raum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "raum_nr", nullable = false)
    private String raumNr;

    @Column(name = "etage")
    private Integer etage;

    @Column(name = "groesse")
    private Integer groesse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRaumNr() {
        return raumNr;
    }

    public Raum raumNr(String raumNr) {
        this.raumNr = raumNr;
        return this;
    }

    public void setRaumNr(String raumNr) {
        this.raumNr = raumNr;
    }

    public Integer getEtage() {
        return etage;
    }

    public Raum etage(Integer etage) {
        this.etage = etage;
        return this;
    }

    public void setEtage(Integer etage) {
        this.etage = etage;
    }

    public Integer getGroesse() {
        return groesse;
    }

    public Raum groesse(Integer groesse) {
        this.groesse = groesse;
        return this;
    }

    public void setGroesse(Integer groesse) {
        this.groesse = groesse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Raum raum = (Raum) o;
        if (raum.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), raum.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Raum{" +
            "id=" + getId() +
            ", raumNr='" + getRaumNr() + "'" +
            ", etage=" + getEtage() +
            ", groesse=" + getGroesse() +
            "}";
    }
}
