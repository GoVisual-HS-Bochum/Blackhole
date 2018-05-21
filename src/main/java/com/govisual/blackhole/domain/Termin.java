package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Termin.
 */
@Entity
@Table(name = "termin")
public class Termin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bezeichnung", nullable = false)
    private String bezeichnung;

    @NotNull
    @Column(name = "startzeit", nullable = false)
    private Instant startzeit;

    @NotNull
    @Column(name = "endzeit", nullable = false)
    private Instant endzeit;

    @ManyToOne(optional = false)
    @NotNull
    private Raum raumNr;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBezeichnung() {
        return bezeichnung;
    }

    public Termin bezeichnung(String bezeichnung) {
        this.bezeichnung = bezeichnung;
        return this;
    }

    public void setBezeichnung(String bezeichnung) {
        this.bezeichnung = bezeichnung;
    }

    public Instant getStartzeit() {
        return startzeit;
    }

    public Termin startzeit(Instant startzeit) {
        this.startzeit = startzeit;
        return this;
    }

    public void setStartzeit(Instant startzeit) {
        this.startzeit = startzeit;
    }

    public Instant getEndzeit() {
        return endzeit;
    }

    public Termin endzeit(Instant endzeit) {
        this.endzeit = endzeit;
        return this;
    }

    public void setEndzeit(Instant endzeit) {
        this.endzeit = endzeit;
    }

    public Raum getRaumNr() {
        return raumNr;
    }

    public Termin raumNr(Raum raum) {
        this.raumNr = raum;
        return this;
    }

    public void setRaumNr(Raum raum) {
        this.raumNr = raum;
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
        Termin termin = (Termin) o;
        if (termin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), termin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Termin{" +
            "id=" + getId() +
            ", bezeichnung='" + getBezeichnung() + "'" +
            ", startzeit='" + getStartzeit() + "'" +
            ", endzeit='" + getEndzeit() + "'" +
            "}";
    }
}
