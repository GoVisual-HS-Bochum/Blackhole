package com.govisual.blackhole.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.govisual.blackhole.domain.PositionRaum;

import com.govisual.blackhole.repository.PositionRaumRepository;
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
 * REST controller for managing PositionRaum.
 */
@RestController
@RequestMapping("/api")
public class PositionRaumResource {

    private final Logger log = LoggerFactory.getLogger(PositionRaumResource.class);

    private static final String ENTITY_NAME = "positionRaum";

    private final PositionRaumRepository positionRaumRepository;

    public PositionRaumResource(PositionRaumRepository positionRaumRepository) {
        this.positionRaumRepository = positionRaumRepository;
    }

    /**
     * POST  /position-raums : Create a new positionRaum.
     *
     * @param positionRaum the positionRaum to create
     * @return the ResponseEntity with status 201 (Created) and with body the new positionRaum, or with status 400 (Bad Request) if the positionRaum has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/position-raums")
    @Timed
    public ResponseEntity<PositionRaum> createPositionRaum(@Valid @RequestBody PositionRaum positionRaum) throws URISyntaxException {
        log.debug("REST request to save PositionRaum : {}", positionRaum);
        if (positionRaum.getId() != null) {
            throw new BadRequestAlertException("A new positionRaum cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PositionRaum result = positionRaumRepository.save(positionRaum);
        return ResponseEntity.created(new URI("/api/position-raums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /position-raums : Updates an existing positionRaum.
     *
     * @param positionRaum the positionRaum to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated positionRaum,
     * or with status 400 (Bad Request) if the positionRaum is not valid,
     * or with status 500 (Internal Server Error) if the positionRaum couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/position-raums")
    @Timed
    public ResponseEntity<PositionRaum> updatePositionRaum(@Valid @RequestBody PositionRaum positionRaum) throws URISyntaxException {
        log.debug("REST request to update PositionRaum : {}", positionRaum);
        if (positionRaum.getId() == null) {
            return createPositionRaum(positionRaum);
        }
        PositionRaum result = positionRaumRepository.save(positionRaum);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, positionRaum.getId().toString()))
            .body(result);
    }

    /**
     * GET  /position-raums : get all the positionRaums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of positionRaums in body
     */
    @GetMapping("/position-raums")
    @Timed
    public List<PositionRaum> getAllPositionRaums() {
        log.debug("REST request to get all PositionRaums");
        return positionRaumRepository.findAll();
        }

    /**
     * GET  /position-raums/:id : get the "id" positionRaum.
     *
     * @param id the id of the positionRaum to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the positionRaum, or with status 404 (Not Found)
     */
    @GetMapping("/position-raums/{id}")
    @Timed
    public ResponseEntity<PositionRaum> getPositionRaum(@PathVariable Long id) {
        log.debug("REST request to get PositionRaum : {}", id);
        PositionRaum positionRaum = positionRaumRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(positionRaum));
    }

    /**
     * DELETE  /position-raums/:id : delete the "id" positionRaum.
     *
     * @param id the id of the positionRaum to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/position-raums/{id}")
    @Timed
    public ResponseEntity<Void> deletePositionRaum(@PathVariable Long id) {
        log.debug("REST request to delete PositionRaum : {}", id);
        positionRaumRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
