package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.Termin;

import com.govisual.blackhole.repository.TerminRepository;
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
 * REST controller for managing Termin.
 */
@RestController
@RequestMapping("/api")
public class TerminResource {

    private final Logger log = LoggerFactory.getLogger(TerminResource.class);

    private static final String ENTITY_NAME = "termin";

    private final TerminRepository terminRepository;

    public TerminResource(TerminRepository terminRepository) {
        this.terminRepository = terminRepository;
    }

    /**
     * POST  /termins : Create a new termin.
     *
     * @param termin the termin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new termin, or with status 400 (Bad Request) if the termin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/termins")
    @Timed
    public ResponseEntity<Termin> createTermin(@Valid @RequestBody Termin termin) throws URISyntaxException {
        log.debug("REST request to save Termin : {}", termin);
        if (termin.getId() != null) {
            throw new BadRequestAlertException("A new termin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Termin result = terminRepository.save(termin);
        return ResponseEntity.created(new URI("/api/termins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /termins : Updates an existing termin.
     *
     * @param termin the termin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated termin,
     * or with status 400 (Bad Request) if the termin is not valid,
     * or with status 500 (Internal Server Error) if the termin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/termins")
    @Timed
    public ResponseEntity<Termin> updateTermin(@Valid @RequestBody Termin termin) throws URISyntaxException {
        log.debug("REST request to update Termin : {}", termin);
        if (termin.getId() == null) {
            return createTermin(termin);
        }
        Termin result = terminRepository.save(termin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, termin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /termins : get all the termins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of termins in body
     */
    @GetMapping("/termins")
    @Timed
    public List<Termin> getAllTermins() {
        log.debug("REST request to get all Termins");
        return terminRepository.findAll();
        }

    /**
     * GET  /termins/:id : get the "id" termin.
     *
     * @param id the id of the termin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the termin, or with status 404 (Not Found)
     */
    @GetMapping("/termins/{id}")
    @Timed
    public ResponseEntity<Termin> getTermin(@PathVariable Long id) {
        log.debug("REST request to get Termin : {}", id);
        Termin termin = terminRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(termin));
    }

    /**
     * DELETE  /termins/:id : delete the "id" termin.
     *
     * @param id the id of the termin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/termins/{id}")
    @Timed
    public ResponseEntity<Void> deleteTermin(@PathVariable Long id) {
        log.debug("REST request to delete Termin : {}", id);
        terminRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
