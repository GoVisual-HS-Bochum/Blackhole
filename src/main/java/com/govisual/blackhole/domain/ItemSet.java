package com.govisual.blackhole.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ItemSet.
 */
@Entity
@Table(name = "item_set")
public class ItemSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "item_set_bez", nullable = false)
    private String itemSetBez;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemSetBez() {
        return itemSetBez;
    }

    public ItemSet itemSetBez(String itemSetBez) {
        this.itemSetBez = itemSetBez;
        return this;
    }

    public void setItemSetBez(String itemSetBez) {
        this.itemSetBez = itemSetBez;
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
        ItemSet itemSet = (ItemSet) o;
        if (itemSet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itemSet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItemSet{" +
            "id=" + getId() +
            ", itemSetBez='" + getItemSetBez() + "'" +
            "}";
    }
}
