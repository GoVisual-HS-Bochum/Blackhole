package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.ItemSet;

import com.govisual.blackhole.repository.ItemSetRepository;
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
 * REST controller for managing ItemSet.
 */
@RestController
@RequestMapping("/api")
public class ItemSetResource {

    private final Logger log = LoggerFactory.getLogger(ItemSetResource.class);

    private static final String ENTITY_NAME = "itemSet";

    private final ItemSetRepository itemSetRepository;

    public ItemSetResource(ItemSetRepository itemSetRepository) {
        this.itemSetRepository = itemSetRepository;
    }

    /**
     * POST  /item-sets : Create a new itemSet.
     *
     * @param itemSet the itemSet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itemSet, or with status 400 (Bad Request) if the itemSet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/item-sets")
    @Timed
    public ResponseEntity<ItemSet> createItemSet(@Valid @RequestBody ItemSet itemSet) throws URISyntaxException {
        log.debug("REST request to save ItemSet : {}", itemSet);
        if (itemSet.getId() != null) {
            throw new BadRequestAlertException("A new itemSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemSet result = itemSetRepository.save(itemSet);
        return ResponseEntity.created(new URI("/api/item-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /item-sets : Updates an existing itemSet.
     *
     * @param itemSet the itemSet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itemSet,
     * or with status 400 (Bad Request) if the itemSet is not valid,
     * or with status 500 (Internal Server Error) if the itemSet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/item-sets")
    @Timed
    public ResponseEntity<ItemSet> updateItemSet(@Valid @RequestBody ItemSet itemSet) throws URISyntaxException {
        log.debug("REST request to update ItemSet : {}", itemSet);
        if (itemSet.getId() == null) {
            return createItemSet(itemSet);
        }
        ItemSet result = itemSetRepository.save(itemSet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itemSet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /item-sets : get all the itemSets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itemSets in body
     */
    @GetMapping("/item-sets")
    @Timed
    public List<ItemSet> getAllItemSets() {
        log.debug("REST request to get all ItemSets");
        return itemSetRepository.findAll();
        }

    /**
     * GET  /item-sets/:id : get the "id" itemSet.
     *
     * @param id the id of the itemSet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itemSet, or with status 404 (Not Found)
     */
    @GetMapping("/item-sets/{id}")
    @Timed
    public ResponseEntity<ItemSet> getItemSet(@PathVariable Long id) {
        log.debug("REST request to get ItemSet : {}", id);
        ItemSet itemSet = itemSetRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(itemSet));
    }

    /**
     * DELETE  /item-sets/:id : delete the "id" itemSet.
     *
     * @param id the id of the itemSet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/item-sets/{id}")
    @Timed
    public ResponseEntity<Void> deleteItemSet(@PathVariable Long id) {
        log.debug("REST request to delete ItemSet : {}", id);
        itemSetRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
