package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.Raum;

import com.govisual.blackhole.repository.RaumRepository;
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
 * REST controller for managing Raum.
 */
@RestController
@RequestMapping("/api")
public class RaumResource {

    private final Logger log = LoggerFactory.getLogger(RaumResource.class);

    private static final String ENTITY_NAME = "raum";

    private final RaumRepository raumRepository;

    public RaumResource(RaumRepository raumRepository) {
        this.raumRepository = raumRepository;
    }

    /**
     * POST  /raums : Create a new raum.
     *
     * @param raum the raum to create
     * @return the ResponseEntity with status 201 (Created) and with body the new raum, or with status 400 (Bad Request) if the raum has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/raums")
    @Timed
    public ResponseEntity<Raum> createRaum(@Valid @RequestBody Raum raum) throws URISyntaxException {
        log.debug("REST request to save Raum : {}", raum);
        if (raum.getId() != null) {
            throw new BadRequestAlertException("A new raum cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Raum result = raumRepository.save(raum);
        return ResponseEntity.created(new URI("/api/raums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /raums : Updates an existing raum.
     *
     * @param raum the raum to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated raum,
     * or with status 400 (Bad Request) if the raum is not valid,
     * or with status 500 (Internal Server Error) if the raum couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/raums")
    @Timed
    public ResponseEntity<Raum> updateRaum(@Valid @RequestBody Raum raum) throws URISyntaxException {
        log.debug("REST request to update Raum : {}", raum);
        if (raum.getId() == null) {
            return createRaum(raum);
        }
        Raum result = raumRepository.save(raum);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, raum.getId().toString()))
            .body(result);
    }

    /**
     * GET  /raums : get all the raums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of raums in body
     */
    @GetMapping("/raums")
    @Timed
    public List<Raum> getAllRaums() {
        log.debug("REST request to get all Raums");
        return raumRepository.findAll();
        }

    /**
     * GET  /raums/:id : get the "id" raum.
     *
     * @param id the id of the raum to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the raum, or with status 404 (Not Found)
     */
    @GetMapping("/raums/{id}")
    @Timed
    public ResponseEntity<Raum> getRaum(@PathVariable Long id) {
        log.debug("REST request to get Raum : {}", id);
        Raum raum = raumRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(raum));
    }

    /**
     * DELETE  /raums/:id : delete the "id" raum.
     *
     * @param id the id of the raum to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/raums/{id}")
    @Timed
    public ResponseEntity<Void> deleteRaum(@PathVariable Long id) {
        log.debug("REST request to delete Raum : {}", id);
        raumRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
