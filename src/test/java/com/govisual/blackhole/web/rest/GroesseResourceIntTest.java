package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.Groesse;
import com.govisual.blackhole.repository.GroesseRepository;
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
 * Test class for the GroesseResource REST controller.
 *
 * @see GroesseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class GroesseResourceIntTest {

    private static final Integer DEFAULT_BREITE = 1;
    private static final Integer UPDATED_BREITE = 2;

    private static final Integer DEFAULT_LAENGE = 1;
    private static final Integer UPDATED_LAENGE = 2;

    @Autowired
    private GroesseRepository groesseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGroesseMockMvc;

    private Groesse groesse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroesseResource groesseResource = new GroesseResource(groesseRepository);
        this.restGroesseMockMvc = MockMvcBuilders.standaloneSetup(groesseResource)
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
    public static Groesse createEntity(EntityManager em) {
        Groesse groesse = new Groesse()
            .breite(DEFAULT_BREITE)
            .laenge(DEFAULT_LAENGE);
        return groesse;
    }

    @Before
    public void initTest() {
        groesse = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroesse() throws Exception {
        int databaseSizeBeforeCreate = groesseRepository.findAll().size();

        // Create the Groesse
        restGroesseMockMvc.perform(post("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groesse)))
            .andExpect(status().isCreated());

        // Validate the Groesse in the database
        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeCreate + 1);
        Groesse testGroesse = groesseList.get(groesseList.size() - 1);
        assertThat(testGroesse.getBreite()).isEqualTo(DEFAULT_BREITE);
        assertThat(testGroesse.getLaenge()).isEqualTo(DEFAULT_LAENGE);
    }

    @Test
    @Transactional
    public void createGroesseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groesseRepository.findAll().size();

        // Create the Groesse with an existing ID
        groesse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroesseMockMvc.perform(post("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groesse)))
            .andExpect(status().isBadRequest());

        // Validate the Groesse in the database
        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBreiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = groesseRepository.findAll().size();
        // set the field null
        groesse.setBreite(null);

        // Create the Groesse, which fails.

        restGroesseMockMvc.perform(post("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groesse)))
            .andExpect(status().isBadRequest());

        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLaengeIsRequired() throws Exception {
        int databaseSizeBeforeTest = groesseRepository.findAll().size();
        // set the field null
        groesse.setLaenge(null);

        // Create the Groesse, which fails.

        restGroesseMockMvc.perform(post("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groesse)))
            .andExpect(status().isBadRequest());

        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGroesses() throws Exception {
        // Initialize the database
        groesseRepository.saveAndFlush(groesse);

        // Get all the groesseList
        restGroesseMockMvc.perform(get("/api/groesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groesse.getId().intValue())))
            .andExpect(jsonPath("$.[*].breite").value(hasItem(DEFAULT_BREITE)))
            .andExpect(jsonPath("$.[*].laenge").value(hasItem(DEFAULT_LAENGE)));
    }

    @Test
    @Transactional
    public void getGroesse() throws Exception {
        // Initialize the database
        groesseRepository.saveAndFlush(groesse);

        // Get the groesse
        restGroesseMockMvc.perform(get("/api/groesses/{id}", groesse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groesse.getId().intValue()))
            .andExpect(jsonPath("$.breite").value(DEFAULT_BREITE))
            .andExpect(jsonPath("$.laenge").value(DEFAULT_LAENGE));
    }

    @Test
    @Transactional
    public void getNonExistingGroesse() throws Exception {
        // Get the groesse
        restGroesseMockMvc.perform(get("/api/groesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroesse() throws Exception {
        // Initialize the database
        groesseRepository.saveAndFlush(groesse);
        int databaseSizeBeforeUpdate = groesseRepository.findAll().size();

        // Update the groesse
        Groesse updatedGroesse = groesseRepository.findOne(groesse.getId());
        // Disconnect from session so that the updates on updatedGroesse are not directly saved in db
        em.detach(updatedGroesse);
        updatedGroesse
            .breite(UPDATED_BREITE)
            .laenge(UPDATED_LAENGE);

        restGroesseMockMvc.perform(put("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroesse)))
            .andExpect(status().isOk());

        // Validate the Groesse in the database
        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeUpdate);
        Groesse testGroesse = groesseList.get(groesseList.size() - 1);
        assertThat(testGroesse.getBreite()).isEqualTo(UPDATED_BREITE);
        assertThat(testGroesse.getLaenge()).isEqualTo(UPDATED_LAENGE);
    }

    @Test
    @Transactional
    public void updateNonExistingGroesse() throws Exception {
        int databaseSizeBeforeUpdate = groesseRepository.findAll().size();

        // Create the Groesse

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGroesseMockMvc.perform(put("/api/groesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groesse)))
            .andExpect(status().isCreated());

        // Validate the Groesse in the database
        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGroesse() throws Exception {
        // Initialize the database
        groesseRepository.saveAndFlush(groesse);
        int databaseSizeBeforeDelete = groesseRepository.findAll().size();

        // Get the groesse
        restGroesseMockMvc.perform(delete("/api/groesses/{id}", groesse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Groesse> groesseList = groesseRepository.findAll();
        assertThat(groesseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Groesse.class);
        Groesse groesse1 = new Groesse();
        groesse1.setId(1L);
        Groesse groesse2 = new Groesse();
        groesse2.setId(groesse1.getId());
        assertThat(groesse1).isEqualTo(groesse2);
        groesse2.setId(2L);
        assertThat(groesse1).isNotEqualTo(groesse2);
        groesse1.setId(null);
        assertThat(groesse1).isNotEqualTo(groesse2);
    }
}
