package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.ItemSetItem;

import com.govisual.blackhole.repository.ItemSetItemRepository;
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
 * REST controller for managing ItemSetItem.
 */
@RestController
@RequestMapping("/api")
public class ItemSetItemResource {

    private final Logger log = LoggerFactory.getLogger(ItemSetItemResource.class);

    private static final String ENTITY_NAME = "itemSetItem";

    private final ItemSetItemRepository itemSetItemRepository;

    public ItemSetItemResource(ItemSetItemRepository itemSetItemRepository) {
        this.itemSetItemRepository = itemSetItemRepository;
    }

    /**
     * POST  /item-set-items : Create a new itemSetItem.
     *
     * @param itemSetItem the itemSetItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itemSetItem, or with status 400 (Bad Request) if the itemSetItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/item-set-items")
    @Timed
    public ResponseEntity<ItemSetItem> createItemSetItem(@Valid @RequestBody ItemSetItem itemSetItem) throws URISyntaxException {
        log.debug("REST request to save ItemSetItem : {}", itemSetItem);
        if (itemSetItem.getId() != null) {
            throw new BadRequestAlertException("A new itemSetItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemSetItem result = itemSetItemRepository.save(itemSetItem);
        return ResponseEntity.created(new URI("/api/item-set-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /item-set-items : Updates an existing itemSetItem.
     *
     * @param itemSetItem the itemSetItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itemSetItem,
     * or with status 400 (Bad Request) if the itemSetItem is not valid,
     * or with status 500 (Internal Server Error) if the itemSetItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/item-set-items")
    @Timed
    public ResponseEntity<ItemSetItem> updateItemSetItem(@Valid @RequestBody ItemSetItem itemSetItem) throws URISyntaxException {
        log.debug("REST request to update ItemSetItem : {}", itemSetItem);
        if (itemSetItem.getId() == null) {
            return createItemSetItem(itemSetItem);
        }
        ItemSetItem result = itemSetItemRepository.save(itemSetItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itemSetItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /item-set-items : get all the itemSetItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itemSetItems in body
     */
    @GetMapping("/item-set-items")
    @Timed
    public List<ItemSetItem> getAllItemSetItems() {
        log.debug("REST request to get all ItemSetItems");
        return itemSetItemRepository.findAll();
        }

    /**
     * GET  /item-set-items/:id : get the "id" itemSetItem.
     *
     * @param id the id of the itemSetItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itemSetItem, or with status 404 (Not Found)
     */
    @GetMapping("/item-set-items/{id}")
    @Timed
    public ResponseEntity<ItemSetItem> getItemSetItem(@PathVariable Long id) {
        log.debug("REST request to get ItemSetItem : {}", id);
        ItemSetItem itemSetItem = itemSetItemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(itemSetItem));
    }

    /**
     * DELETE  /item-set-items/:id : delete the "id" itemSetItem.
     *
     * @param id the id of the itemSetItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/item-set-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteItemSetItem(@PathVariable Long id) {
        log.debug("REST request to delete ItemSetItem : {}", id);
        itemSetItemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
