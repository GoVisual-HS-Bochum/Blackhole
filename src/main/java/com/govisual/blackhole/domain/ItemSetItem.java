package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ItemSetItem.
 */
@Entity
@Table(name = "item_set_item")
public class ItemSetItem implements Serializable {

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
    private Item itemBez;

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

    public ItemSetItem anzahl(Integer anzahl) {
        this.anzahl = anzahl;
        return this;
    }

    public void setAnzahl(Integer anzahl) {
        this.anzahl = anzahl;
    }

    public ItemSet getItemSetBez() {
        return itemSetBez;
    }

    public ItemSetItem itemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
        return this;
    }

    public void setItemSetBez(ItemSet itemSet) {
        this.itemSetBez = itemSet;
    }

    public Item getItemBez() {
        return itemBez;
    }

    public ItemSetItem itemBez(Item item) {
        this.itemBez = item;
        return this;
    }

    public void setItemBez(Item item) {
        this.itemBez = item;
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
        ItemSetItem itemSetItem = (ItemSetItem) o;
        if (itemSetItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itemSetItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItemSetItem{" +
            "id=" + getId() +
            ", anzahl=" + getAnzahl() +
            "}";
    }
}
