package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.Groesse;

import com.govisual.blackhole.repository.GroesseRepository;
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
 * REST controller for managing Groesse.
 */
@RestController
@RequestMapping("/api")
public class GroesseResource {

    private final Logger log = LoggerFactory.getLogger(GroesseResource.class);

    private static final String ENTITY_NAME = "groesse";

    private final GroesseRepository groesseRepository;

    public GroesseResource(GroesseRepository groesseRepository) {
        this.groesseRepository = groesseRepository;
    }

    /**
     * POST  /groesses : Create a new groesse.
     *
     * @param groesse the groesse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new groesse, or with status 400 (Bad Request) if the groesse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/groesses")
    @Timed
    public ResponseEntity<Groesse> createGroesse(@Valid @RequestBody Groesse groesse) throws URISyntaxException {
        log.debug("REST request to save Groesse : {}", groesse);
        if (groesse.getId() != null) {
            throw new BadRequestAlertException("A new groesse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Groesse result = groesseRepository.save(groesse);
        return ResponseEntity.created(new URI("/api/groesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /groesses : Updates an existing groesse.
     *
     * @param groesse the groesse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated groesse,
     * or with status 400 (Bad Request) if the groesse is not valid,
     * or with status 500 (Internal Server Error) if the groesse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/groesses")
    @Timed
    public ResponseEntity<Groesse> updateGroesse(@Valid @RequestBody Groesse groesse) throws URISyntaxException {
        log.debug("REST request to update Groesse : {}", groesse);
        if (groesse.getId() == null) {
            return createGroesse(groesse);
        }
        Groesse result = groesseRepository.save(groesse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, groesse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /groesses : get all the groesses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of groesses in body
     */
    @GetMapping("/groesses")
    @Timed
    public List<Groesse> getAllGroesses() {
        log.debug("REST request to get all Groesses");
        return groesseRepository.findAll();
        }

    /**
     * GET  /groesses/:id : get the "id" groesse.
     *
     * @param id the id of the groesse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the groesse, or with status 404 (Not Found)
     */
    @GetMapping("/groesses/{id}")
    @Timed
    public ResponseEntity<Groesse> getGroesse(@PathVariable Long id) {
        log.debug("REST request to get Groesse : {}", id);
        Groesse groesse = groesseRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(groesse));
    }

    /**
     * DELETE  /groesses/:id : delete the "id" groesse.
     *
     * @param id the id of the groesse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/groesses/{id}")
    @Timed
    public ResponseEntity<Void> deleteGroesse(@PathVariable Long id) {
        log.debug("REST request to delete Groesse : {}", id);
        groesseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
