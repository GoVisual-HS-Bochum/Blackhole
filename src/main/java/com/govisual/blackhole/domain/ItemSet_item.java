package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ItemSet_item.
 */
@Entity
@Table(name = "item_set_item")
public class ItemSet_item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anzahl")
    private Integer anzahl;

    @ManyToOne(optional = false)
    @NotNull
    private ItemSet itemSetBez;

    @ManyToOne(optional = false)
    @NotNull
    private Item bezeichnung;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnzahl() {
        return anzahl;
    }

    public ItemSet_item anzahl(Integer anzahl) {
        this.anzahl = anzahl;
        return this;
    }

    public void setAnzahl(Integer anzahl) {
        this.anzahl = anzahl;
    }

    public ItemSet getItemSetBez() {
        return itemSetBez;
    }

    public ItemSet_item itemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
        return this;
    }

    public void setItemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
    }

    public Item getBezeichnung() {
        return bezeichnung;
    }

    public ItemSet_item bezeichnung(Item item) {
        this.bezeichnung = item;
        return this;
    }

    public void setBezeichnung(Item item) {
        this.bezeichnung = item;
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
        ItemSet_item itemSet_item = (ItemSet_item) o;
        if (itemSet_item.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itemSet_item.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItemSet_item{" +
            "id=" + getId() +
            ", anzahl=" + getAnzahl() +
            "}";
    }
}
