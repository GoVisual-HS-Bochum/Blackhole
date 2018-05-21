package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.ItemSet_item;

import com.govisual.blackhole.repository.ItemSet_itemRepository;
import com.govisual.blackhole.web.rest.errors.BadRequestAlertException;
import com.govisual.blackhole.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ItemSet_item.
 */
@RestController
@RequestMapping("/api")
public class ItemSet_itemResource {

    private final Logger log = LoggerFactory.getLogger(ItemSet_itemResource.class);

    private static final String ENTITY_NAME = "itemSet_item";

    private final ItemSet_itemRepository itemSet_itemRepository;

    public ItemSet_itemResource(ItemSet_itemRepository itemSet_itemRepository) {
        this.itemSet_itemRepository = itemSet_itemRepository;
    }

    /**
     * POST  /item-set-items : Create a new itemSet_item.
     *
     * @param itemSet_item the itemSet_item to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itemSet_item, or with status 400 (Bad Request) if the itemSet_item has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/item-set-items")
    @Timed
    public ResponseEntity<ItemSet_item> createItemSet_item(@Valid @RequestBody ItemSet_item itemSet_item) throws URISyntaxException {
        log.debug("REST request to save ItemSet_item : {}", itemSet_item);
        if (itemSet_item.getId() != null) {
            throw new BadRequestAlertException("A new itemSet_item cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemSet_item result = itemSet_itemRepository.save(itemSet_item);
        return ResponseEntity.created(new URI("/api/item-set-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /item-set-items : Updates an existing itemSet_item.
     *
     * @param itemSet_item the itemSet_item to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itemSet_item,
     * or with status 400 (Bad Request) if the itemSet_item is not valid,
     * or with status 500 (Internal Server Error) if the itemSet_item couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/item-set-items")
    @Timed
    public ResponseEntity<ItemSet_item> updateItemSet_item(@Valid @RequestBody ItemSet_item itemSet_item) throws URISyntaxException {
        log.debug("REST request to update ItemSet_item : {}", itemSet_item);
        if (itemSet_item.getId() == null) {
            return createItemSet_item(itemSet_item);
        }
        ItemSet_item result = itemSet_itemRepository.save(itemSet_item);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itemSet_item.getId().toString()))
            .body(result);
    }

    /**
     * GET  /item-set-items : get all the itemSet_items.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itemSet_items in body
     */
    @GetMapping("/item-set-items")
    @Timed
    public List<ItemSet_item> getAllItemSet_items() {
        log.debug("REST request to get all ItemSet_items");
        return itemSet_itemRepository.findAll();
        }

    /**
     * GET  /item-set-items/:id : get the "id" itemSet_item.
     *
     * @param id the id of the itemSet_item to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itemSet_item, or with status 404 (Not Found)
     */
    @GetMapping("/item-set-items/{id}")
    @Timed
    public ResponseEntity<ItemSet_item> getItemSet_item(@PathVariable Long id) {
        log.debug("REST request to get ItemSet_item : {}", id);
        ItemSet_item itemSet_item = itemSet_itemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(itemSet_item));
    }

    /**
     * DELETE  /item-set-items/:id : delete the "id" itemSet_item.
     *
     * @param id the id of the itemSet_item to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/item-set-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteItemSet_item(@PathVariable Long id) {
        log.debug("REST request to delete ItemSet_item : {}", id);
        itemSet_itemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
