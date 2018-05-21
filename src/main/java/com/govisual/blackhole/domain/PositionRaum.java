package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PositionRaum.
 */
@Entity
@Table(name = "position_raum")
public class PositionRaum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "gebaeude", nullable = false)
    private String gebaeude;

    @NotNull
    @Column(name = "etage", nullable = false)
    private Integer etage;

    @NotNull
    @Column(name = "gang", nullable = false)
    private Integer gang;

    @NotNull
    @Column(name = "seite", nullable = false)
    private String seite;

    @NotNull
    @Column(name = "links", nullable = false)
    private String links;

    @NotNull
    @Column(name = "rechts", nullable = false)
    private String rechts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGebaeude() {
        return gebaeude;
    }

    public PositionRaum gebaeude(String gebaeude) {
        this.gebaeude = gebaeude;
        return this;
    }

    public void setGebaeude(String gebaeude) {
        this.gebaeude = gebaeude;
    }

    public Integer getEtage() {
        return etage;
    }

    public PositionRaum etage(Integer etage) {
        this.etage = etage;
        return this;
    }

    public void setEtage(Integer etage) {
        this.etage = etage;
    }

    public Integer getGang() {
        return gang;
    }

    public PositionRaum gang(Integer gang) {
        this.gang = gang;
        return this;
    }

    public void setGang(Integer gang) {
        this.gang = gang;
    }

    public String getSeite() {
        return seite;
    }

    public PositionRaum seite(String seite) {
        this.seite = seite;
        return this;
    }

    public void setSeite(String seite) {
        this.seite = seite;
    }

    public String getLinks() {
        return links;
    }

    public PositionRaum links(String links) {
        this.links = links;
        return this;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public String getRechts() {
        return rechts;
    }

    public PositionRaum rechts(String rechts) {
        this.rechts = rechts;
        return this;
    }

    public void setRechts(String rechts) {
        this.rechts = rechts;
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
        PositionRaum positionRaum = (PositionRaum) o;
        if (positionRaum.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), positionRaum.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PositionRaum{" +
            "id=" + getId() +
            ", gebaeude='" + getGebaeude() + "'" +
            ", etage=" + getEtage() +
            ", gang=" + getGang() +
            ", seite='" + getSeite() + "'" +
            ", links='" + getLinks() + "'" +
            ", rechts='" + getRechts() + "'" +
            "}";
    }
}
