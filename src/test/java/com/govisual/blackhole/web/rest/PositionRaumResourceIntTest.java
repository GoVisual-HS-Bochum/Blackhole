package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.PositionRaum;
import com.govisual.blackhole.repository.PositionRaumRepository;
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
 * Test class for the PositionRaumResource REST controller.
 *
 * @see PositionRaumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class PositionRaumResourceIntTest {

    private static final String DEFAULT_GEBAEUDE = "AAAAAAAAAA";
    private static final String UPDATED_GEBAEUDE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAGE = 1;
    private static final Integer UPDATED_ETAGE = 2;

    private static final Integer DEFAULT_GANG = 1;
    private static final Integer UPDATED_GANG = 2;

    private static final String DEFAULT_SEITE = "AAAAAAAAAA";
    private static final String UPDATED_SEITE = "BBBBBBBBBB";

    private static final String DEFAULT_LINKS = "AAAAAAAAAA";
    private static final String UPDATED_LINKS = "BBBBBBBBBB";

    private static final String DEFAULT_RECHTS = "AAAAAAAAAA";
    private static final String UPDATED_RECHTS = "BBBBBBBBBB";

    @Autowired
    private PositionRaumRepository positionRaumRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPositionRaumMockMvc;

    private PositionRaum positionRaum;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PositionRaumResource positionRaumResource = new PositionRaumResource(positionRaumRepository);
        this.restPositionRaumMockMvc = MockMvcBuilders.standaloneSetup(positionRaumResource)
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
    public static PositionRaum createEntity(EntityManager em) {
        PositionRaum positionRaum = new PositionRaum()
            .gebaeude(DEFAULT_GEBAEUDE)
            .etage(DEFAULT_ETAGE)
            .gang(DEFAULT_GANG)
            .seite(DEFAULT_SEITE)
            .links(DEFAULT_LINKS)
            .rechts(DEFAULT_RECHTS);
        return positionRaum;
    }

    @Before
    public void initTest() {
        positionRaum = createEntity(em);
    }

    @Test
    @Transactional
    public void createPositionRaum() throws Exception {
        int databaseSizeBeforeCreate = positionRaumRepository.findAll().size();

        // Create the PositionRaum
        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isCreated());

        // Validate the PositionRaum in the database
        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeCreate + 1);
        PositionRaum testPositionRaum = positionRaumList.get(positionRaumList.size() - 1);
        assertThat(testPositionRaum.getGebaeude()).isEqualTo(DEFAULT_GEBAEUDE);
        assertThat(testPositionRaum.getEtage()).isEqualTo(DEFAULT_ETAGE);
        assertThat(testPositionRaum.getGang()).isEqualTo(DEFAULT_GANG);
        assertThat(testPositionRaum.getSeite()).isEqualTo(DEFAULT_SEITE);
        assertThat(testPositionRaum.getLinks()).isEqualTo(DEFAULT_LINKS);
        assertThat(testPositionRaum.getRechts()).isEqualTo(DEFAULT_RECHTS);
    }

    @Test
    @Transactional
    public void createPositionRaumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = positionRaumRepository.findAll().size();

        // Create the PositionRaum with an existing ID
        positionRaum.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        // Validate the PositionRaum in the database
        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGebaeudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setGebaeude(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEtageIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setEtage(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGangIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setGang(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSeiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setSeite(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLinksIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setLinks(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRechtsIsRequired() throws Exception {
        int databaseSizeBeforeTest = positionRaumRepository.findAll().size();
        // set the field null
        positionRaum.setRechts(null);

        // Create the PositionRaum, which fails.

        restPositionRaumMockMvc.perform(post("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isBadRequest());

        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPositionRaums() throws Exception {
        // Initialize the database
        positionRaumRepository.saveAndFlush(positionRaum);

        // Get all the positionRaumList
        restPositionRaumMockMvc.perform(get("/api/position-raums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(positionRaum.getId().intValue())))
            .andExpect(jsonPath("$.[*].gebaeude").value(hasItem(DEFAULT_GEBAEUDE.toString())))
            .andExpect(jsonPath("$.[*].etage").value(hasItem(DEFAULT_ETAGE)))
            .andExpect(jsonPath("$.[*].gang").value(hasItem(DEFAULT_GANG)))
            .andExpect(jsonPath("$.[*].seite").value(hasItem(DEFAULT_SEITE.toString())))
            .andExpect(jsonPath("$.[*].links").value(hasItem(DEFAULT_LINKS.toString())))
            .andExpect(jsonPath("$.[*].rechts").value(hasItem(DEFAULT_RECHTS.toString())));
    }

    @Test
    @Transactional
    public void getPositionRaum() throws Exception {
        // Initialize the database
        positionRaumRepository.saveAndFlush(positionRaum);

        // Get the positionRaum
        restPositionRaumMockMvc.perform(get("/api/position-raums/{id}", positionRaum.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(positionRaum.getId().intValue()))
            .andExpect(jsonPath("$.gebaeude").value(DEFAULT_GEBAEUDE.toString()))
            .andExpect(jsonPath("$.etage").value(DEFAULT_ETAGE))
            .andExpect(jsonPath("$.gang").value(DEFAULT_GANG))
            .andExpect(jsonPath("$.seite").value(DEFAULT_SEITE.toString()))
            .andExpect(jsonPath("$.links").value(DEFAULT_LINKS.toString()))
            .andExpect(jsonPath("$.rechts").value(DEFAULT_RECHTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPositionRaum() throws Exception {
        // Get the positionRaum
        restPositionRaumMockMvc.perform(get("/api/position-raums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePositionRaum() throws Exception {
        // Initialize the database
        positionRaumRepository.saveAndFlush(positionRaum);
        int databaseSizeBeforeUpdate = positionRaumRepository.findAll().size();

        // Update the positionRaum
        PositionRaum updatedPositionRaum = positionRaumRepository.findOne(positionRaum.getId());
        // Disconnect from session so that the updates on updatedPositionRaum are not directly saved in db
        em.detach(updatedPositionRaum);
        updatedPositionRaum
            .gebaeude(UPDATED_GEBAEUDE)
            .etage(UPDATED_ETAGE)
            .gang(UPDATED_GANG)
            .seite(UPDATED_SEITE)
            .links(UPDATED_LINKS)
            .rechts(UPDATED_RECHTS);

        restPositionRaumMockMvc.perform(put("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPositionRaum)))
            .andExpect(status().isOk());

        // Validate the PositionRaum in the database
        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeUpdate);
        PositionRaum testPositionRaum = positionRaumList.get(positionRaumList.size() - 1);
        assertThat(testPositionRaum.getGebaeude()).isEqualTo(UPDATED_GEBAEUDE);
        assertThat(testPositionRaum.getEtage()).isEqualTo(UPDATED_ETAGE);
        assertThat(testPositionRaum.getGang()).isEqualTo(UPDATED_GANG);
        assertThat(testPositionRaum.getSeite()).isEqualTo(UPDATED_SEITE);
        assertThat(testPositionRaum.getLinks()).isEqualTo(UPDATED_LINKS);
        assertThat(testPositionRaum.getRechts()).isEqualTo(UPDATED_RECHTS);
    }

    @Test
    @Transactional
    public void updateNonExistingPositionRaum() throws Exception {
        int databaseSizeBeforeUpdate = positionRaumRepository.findAll().size();

        // Create the PositionRaum

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPositionRaumMockMvc.perform(put("/api/position-raums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(positionRaum)))
            .andExpect(status().isCreated());

        // Validate the PositionRaum in the database
        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePositionRaum() throws Exception {
        // Initialize the database
        positionRaumRepository.saveAndFlush(positionRaum);
        int databaseSizeBeforeDelete = positionRaumRepository.findAll().size();

        // Get the positionRaum
        restPositionRaumMockMvc.perform(delete("/api/position-raums/{id}", positionRaum.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PositionRaum> positionRaumList = positionRaumRepository.findAll();
        assertThat(positionRaumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PositionRaum.class);
        PositionRaum positionRaum1 = new PositionRaum();
        positionRaum1.setId(1L);
        PositionRaum positionRaum2 = new PositionRaum();
        positionRaum2.setId(positionRaum1.getId());
        assertThat(positionRaum1).isEqualTo(positionRaum2);
        positionRaum2.setId(2L);
        assertThat(positionRaum1).isNotEqualTo(positionRaum2);
        positionRaum1.setId(null);
        assertThat(positionRaum1).isNotEqualTo(positionRaum2);
    }
}
