package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.Termin;
import com.govisual.blackhole.domain.Raum;
import com.govisual.blackhole.repository.TerminRepository;
import com.govisual.blackhole.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.govisual.blackhole.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TerminResource REST controller.
 *
 * @see TerminResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class TerminResourceIntTest {

    private static final String DEFAULT_BEZEICHNUNG = "AAAAAAAAAA";
    private static final String UPDATED_BEZEICHNUNG = "BBBBBBBBBB";

    private static final Instant DEFAULT_STARTZEIT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STARTZEIT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ENDZEIT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENDZEIT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TerminRepository terminRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTerminMockMvc;

    private Termin termin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TerminResource terminResource = new TerminResource(terminRepository);
        this.restTerminMockMvc = MockMvcBuilders.standaloneSetup(terminResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Termin createEntity(EntityManager em) {
        Termin termin = new Termin()
            .bezeichnung(DEFAULT_BEZEICHNUNG)
            .startzeit(DEFAULT_STARTZEIT)
            .endzeit(DEFAULT_ENDZEIT);
        // Add required entity
        Raum raumNr = RaumResourceIntTest.createEntity(em);
        em.persist(raumNr);
        em.flush();
        termin.setRaumNr(raumNr);
        return termin;
    }

    @Before
    public void initTest() {
        termin = createEntity(em);
    }

    @Test
    @Transactional
    public void createTermin() throws Exception {
        int databaseSizeBeforeCreate = terminRepository.findAll().size();

        // Create the Termin
        restTerminMockMvc.perform(post("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isCreated());

        // Validate the Termin in the database
        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeCreate + 1);
        Termin testTermin = terminList.get(terminList.size() - 1);
        assertThat(testTermin.getBezeichnung()).isEqualTo(DEFAULT_BEZEICHNUNG);
        assertThat(testTermin.getStartzeit()).isEqualTo(DEFAULT_STARTZEIT);
        assertThat(testTermin.getEndzeit()).isEqualTo(DEFAULT_ENDZEIT);
    }

    @Test
    @Transactional
    public void createTerminWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = terminRepository.findAll().size();

        // Create the Termin with an existing ID
        termin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTerminMockMvc.perform(post("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isBadRequest());

        // Validate the Termin in the database
        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBezeichnungIsRequired() throws Exception {
        int databaseSizeBeforeTest = terminRepository.findAll().size();
        // set the field null
        termin.setBezeichnung(null);

        // Create the Termin, which fails.

        restTerminMockMvc.perform(post("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isBadRequest());

        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartzeitIsRequired() throws Exception {
        int databaseSizeBeforeTest = terminRepository.findAll().size();
        // set the field null
        termin.setStartzeit(null);

        // Create the Termin, which fails.

        restTerminMockMvc.perform(post("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isBadRequest());

        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndzeitIsRequired() throws Exception {
        int databaseSizeBeforeTest = terminRepository.findAll().size();
        // set the field null
        termin.setEndzeit(null);

        // Create the Termin, which fails.

        restTerminMockMvc.perform(post("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isBadRequest());

        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTermins() throws Exception {
        // Initialize the database
        terminRepository.saveAndFlush(termin);

        // Get all the terminList
        restTerminMockMvc.perform(get("/api/termins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(termin.getId().intValue())))
            .andExpect(jsonPath("$.[*].bezeichnung").value(hasItem(DEFAULT_BEZEICHNUNG.toString())))
            .andExpect(jsonPath("$.[*].startzeit").value(hasItem(DEFAULT_STARTZEIT.toString())))
            .andExpect(jsonPath("$.[*].endzeit").value(hasItem(DEFAULT_ENDZEIT.toString())));
    }

    @Test
    @Transactional
    public void getTermin() throws Exception {
        // Initialize the database
        terminRepository.saveAndFlush(termin);

        // Get the termin
        restTerminMockMvc.perform(get("/api/termins/{id}", termin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(termin.getId().intValue()))
            .andExpect(jsonPath("$.bezeichnung").value(DEFAULT_BEZEICHNUNG.toString()))
            .andExpect(jsonPath("$.startzeit").value(DEFAULT_STARTZEIT.toString()))
            .andExpect(jsonPath("$.endzeit").value(DEFAULT_ENDZEIT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTermin() throws Exception {
        // Get the termin
        restTerminMockMvc.perform(get("/api/termins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTermin() throws Exception {
        // Initialize the database
        terminRepository.saveAndFlush(termin);
        int databaseSizeBeforeUpdate = terminRepository.findAll().size();

        // Update the termin
        Termin updatedTermin = terminRepository.findOne(termin.getId());
        // Disconnect from session so that the updates on updatedTermin are not directly saved in db
        em.detach(updatedTermin);
        updatedTermin
            .bezeichnung(UPDATED_BEZEICHNUNG)
            .startzeit(UPDATED_STARTZEIT)
            .endzeit(UPDATED_ENDZEIT);

        restTerminMockMvc.perform(put("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTermin)))
            .andExpect(status().isOk());

        // Validate the Termin in the database
        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeUpdate);
        Termin testTermin = terminList.get(terminList.size() - 1);
        assertThat(testTermin.getBezeichnung()).isEqualTo(UPDATED_BEZEICHNUNG);
        assertThat(testTermin.getStartzeit()).isEqualTo(UPDATED_STARTZEIT);
        assertThat(testTermin.getEndzeit()).isEqualTo(UPDATED_ENDZEIT);
    }

    @Test
    @Transactional
    public void updateNonExistingTermin() throws Exception {
        int databaseSizeBeforeUpdate = terminRepository.findAll().size();

        // Create the Termin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTerminMockMvc.perform(put("/api/termins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termin)))
            .andExpect(status().isCreated());

        // Validate the Termin in the database
        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTermin() throws Exception {
        // Initialize the database
        terminRepository.saveAndFlush(termin);
        int databaseSizeBeforeDelete = terminRepository.findAll().size();

        // Get the termin
        restTerminMockMvc.perform(delete("/api/termins/{id}", termin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Termin> terminList = terminRepository.findAll();
        assertThat(terminList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Termin.class);
        Termin termin1 = new Termin();
        termin1.setId(1L);
        Termin termin2 = new Termin();
        termin2.setId(termin1.getId());
        assertThat(termin1).isEqualTo(termin2);
        termin2.setId(2L);
        assertThat(termin1).isNotEqualTo(termin2);
        termin1.setId(null);
        assertThat(termin1).isNotEqualTo(termin2);
    }
}
