package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.Raum;
import com.govisual.blackhole.repository.RaumRepository;
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
import java.util.List;

import static com.govisual.blackhole.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RaumResource REST controller.
 *
 * @see RaumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class RaumResourceIntTest {

    private static final String DEFAULT_RAUM_NR = "AAAAAAAAAA";
    private static final String UPDATED_RAUM_NR = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAGE = 1;
    private static final Integer UPDATED_ETAGE = 2;

    private static final Integer DEFAULT_GROESSE = 1;
    private static final Integer UPDATED_GROESSE = 2;

    @Autowired
    private RaumRepository raumRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRaumMockMvc;

    private Raum raum;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RaumResource raumResource = new RaumResource(raumRepository);
        this.restRaumMockMvc = MockMvcBuilders.standaloneSetup(raumResource)
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
    public static Raum createEntity(EntityManager em) {
        Raum raum = new Raum()
            .raumNr(DEFAULT_RAUM_NR)
            .etage(DEFAULT_ETAGE)
            .groesse(DEFAULT_GROESSE);
        return raum;
    }

    @Before
    public void initTest() {
        raum = createEntity(em);
    }

    @Test
    @Transactional
    public void createRaum() throws Exception {
        int databaseSizeBeforeCreate = raumRepository.findAll().size();

        // Create the Raum
        restRaumMockMvc.perform(post("/api/raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raum)))
            .andExpect(status().isCreated());

        // Validate the Raum in the database
        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeCreate + 1);
        Raum testRaum = raumList.get(raumList.size() - 1);
        assertThat(testRaum.getRaumNr()).isEqualTo(DEFAULT_RAUM_NR);
        assertThat(testRaum.getEtage()).isEqualTo(DEFAULT_ETAGE);
        assertThat(testRaum.getGroesse()).isEqualTo(DEFAULT_GROESSE);
    }

    @Test
    @Transactional
    public void createRaumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = raumRepository.findAll().size();

        // Create the Raum with an existing ID
        raum.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRaumMockMvc.perform(post("/api/raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raum)))
            .andExpect(status().isBadRequest());

        // Validate the Raum in the database
        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRaumNrIsRequired() throws Exception {
        int databaseSizeBeforeTest = raumRepository.findAll().size();
        // set the field null
        raum.setRaumNr(null);

        // Create the Raum, which fails.

        restRaumMockMvc.perform(post("/api/raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raum)))
            .andExpect(status().isBadRequest());

        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRaums() throws Exception {
        // Initialize the database
        raumRepository.saveAndFlush(raum);

        // Get all the raumList
        restRaumMockMvc.perform(get("/api/raums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(raum.getId().intValue())))
            .andExpect(jsonPath("$.[*].raumNr").value(hasItem(DEFAULT_RAUM_NR.toString())))
            .andExpect(jsonPath("$.[*].etage").value(hasItem(DEFAULT_ETAGE)))
            .andExpect(jsonPath("$.[*].groesse").value(hasItem(DEFAULT_GROESSE)));
    }

    @Test
    @Transactional
    public void getRaum() throws Exception {
        // Initialize the database
        raumRepository.saveAndFlush(raum);

        // Get the raum
        restRaumMockMvc.perform(get("/api/raums/{id}", raum.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(raum.getId().intValue()))
            .andExpect(jsonPath("$.raumNr").value(DEFAULT_RAUM_NR.toString()))
            .andExpect(jsonPath("$.etage").value(DEFAULT_ETAGE))
            .andExpect(jsonPath("$.groesse").value(DEFAULT_GROESSE));
    }

    @Test
    @Transactional
    public void getNonExistingRaum() throws Exception {
        // Get the raum
        restRaumMockMvc.perform(get("/api/raums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRaum() throws Exception {
        // Initialize the database
        raumRepository.saveAndFlush(raum);
        int databaseSizeBeforeUpdate = raumRepository.findAll().size();

        // Update the raum
        Raum updatedRaum = raumRepository.findOne(raum.getId());
        // Disconnect from session so that the updates on updatedRaum are not directly saved in db
        em.detach(updatedRaum);
        updatedRaum
            .raumNr(UPDATED_RAUM_NR)
            .etage(UPDATED_ETAGE)
            .groesse(UPDATED_GROESSE);

        restRaumMockMvc.perform(put("/api/raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRaum)))
            .andExpect(status().isOk());

        // Validate the Raum in the database
        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeUpdate);
        Raum testRaum = raumList.get(raumList.size() - 1);
        assertThat(testRaum.getRaumNr()).isEqualTo(UPDATED_RAUM_NR);
        assertThat(testRaum.getEtage()).isEqualTo(UPDATED_ETAGE);
        assertThat(testRaum.getGroesse()).isEqualTo(UPDATED_GROESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingRaum() throws Exception {
        int databaseSizeBeforeUpdate = raumRepository.findAll().size();

        // Create the Raum

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRaumMockMvc.perform(put("/api/raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raum)))
            .andExpect(status().isCreated());

        // Validate the Raum in the database
        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRaum() throws Exception {
        // Initialize the database
        raumRepository.saveAndFlush(raum);
        int databaseSizeBeforeDelete = raumRepository.findAll().size();

        // Get the raum
        restRaumMockMvc.perform(delete("/api/raums/{id}", raum.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Raum> raumList = raumRepository.findAll();
        assertThat(raumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Raum.class);
        Raum raum1 = new Raum();
        raum1.setId(1L);
        Raum raum2 = new Raum();
        raum2.setId(raum1.getId());
        assertThat(raum1).isEqualTo(raum2);
        raum2.setId(2L);
        assertThat(raum1).isNotEqualTo(raum2);
        raum1.setId(null);
        assertThat(raum1).isNotEqualTo(raum2);
    }
}
