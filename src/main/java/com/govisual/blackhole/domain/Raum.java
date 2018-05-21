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

    @Column(name = "art")
    private String art;

    @ManyToOne(optional = false)
    @NotNull
    private PositionRaum posID;

    @ManyToOne(optional = false)
    @NotNull
    private Groesse groID;

    @ManyToOne
    private ItemSet itemSetBez;

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

    public String getArt() {
        return art;
    }

    public Raum art(String art) {
        this.art = art;
        return this;
    }

    public void setArt(String art) {
        this.art = art;
    }

    public PositionRaum getPosID() {
        return posID;
    }

    public Raum posID(PositionRaum positionRaum) {
        this.posID = positionRaum;
        return this;
    }

    public void setPosID(PositionRaum positionRaum) {
        this.posID = positionRaum;
    }

    public Groesse getGroID() {
        return groID;
    }

    public Raum groID(Groesse groesse) {
        this.groID = groesse;
        return this;
    }

    public void setGroID(Groesse groesse) {
        this.groID = groesse;
    }

    public ItemSet getItemSetBez() {
        return itemSetBez;
    }

    public Raum itemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
        return this;
    }

    public void setItemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
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
            ", art='" + getArt() + "'" +
            "}";
    }
}
