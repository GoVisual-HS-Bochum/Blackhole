package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Groesse.
 */
@Entity
@Table(name = "groesse")
public class Groesse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "breite", nullable = false)
    private Integer breite;

    @NotNull
    @Column(name = "laenge", nullable = false)
    private Integer laenge;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBreite() {
        return breite;
    }

    public Groesse breite(Integer breite) {
        this.breite = breite;
        return this;
    }

    public void setBreite(Integer breite) {
        this.breite = breite;
    }

    public Integer getLaenge() {
        return laenge;
    }

    public Groesse laenge(Integer laenge) {
        this.laenge = laenge;
        return this;
    }

    public void setLaenge(Integer laenge) {
        this.laenge = laenge;
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
        Groesse groesse = (Groesse) o;
        if (groesse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), groesse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Groesse{" +
            "id=" + getId() +
            ", breite=" + getBreite() +
            ", laenge=" + getLaenge() +
            "}";
    }
}
