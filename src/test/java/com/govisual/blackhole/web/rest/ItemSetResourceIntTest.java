package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.ItemSet;
import com.govisual.blackhole.repository.ItemSetRepository;
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
 * Test class for the ItemSetResource REST controller.
 *
 * @see ItemSetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class ItemSetResourceIntTest {

    private static final String DEFAULT_ITEM_SET_BEZ = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_SET_BEZ = "BBBBBBBBBB";

    @Autowired
    private ItemSetRepository itemSetRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItemSetMockMvc;

    private ItemSet itemSet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemSetResource itemSetResource = new ItemSetResource(itemSetRepository);
        this.restItemSetMockMvc = MockMvcBuilders.standaloneSetup(itemSetResource)
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
    public static ItemSet createEntity(EntityManager em) {
        ItemSet itemSet = new ItemSet()
            .itemSetBez(DEFAULT_ITEM_SET_BEZ);
        return itemSet;
    }

    @Before
    public void initTest() {
        itemSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemSet() throws Exception {
        int databaseSizeBeforeCreate = itemSetRepository.findAll().size();

        // Create the ItemSet
        restItemSetMockMvc.perform(post("/api/item-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet)))
            .andExpect(status().isCreated());

        // Validate the ItemSet in the database
        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeCreate + 1);
        ItemSet testItemSet = itemSetList.get(itemSetList.size() - 1);
        assertThat(testItemSet.getItemSetBez()).isEqualTo(DEFAULT_ITEM_SET_BEZ);
    }

    @Test
    @Transactional
    public void createItemSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemSetRepository.findAll().size();

        // Create the ItemSet with an existing ID
        itemSet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemSetMockMvc.perform(post("/api/item-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet)))
            .andExpect(status().isBadRequest());

        // Validate the ItemSet in the database
        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkItemSetBezIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemSetRepository.findAll().size();
        // set the field null
        itemSet.setItemSetBez(null);

        // Create the ItemSet, which fails.

        restItemSetMockMvc.perform(post("/api/item-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet)))
            .andExpect(status().isBadRequest());

        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemSets() throws Exception {
        // Initialize the database
        itemSetRepository.saveAndFlush(itemSet);

        // Get all the itemSetList
        restItemSetMockMvc.perform(get("/api/item-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemSetBez").value(hasItem(DEFAULT_ITEM_SET_BEZ.toString())));
    }

    @Test
    @Transactional
    public void getItemSet() throws Exception {
        // Initialize the database
        itemSetRepository.saveAndFlush(itemSet);

        // Get the itemSet
        restItemSetMockMvc.perform(get("/api/item-sets/{id}", itemSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemSet.getId().intValue()))
            .andExpect(jsonPath("$.itemSetBez").value(DEFAULT_ITEM_SET_BEZ.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemSet() throws Exception {
        // Get the itemSet
        restItemSetMockMvc.perform(get("/api/item-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemSet() throws Exception {
        // Initialize the database
        itemSetRepository.saveAndFlush(itemSet);
        int databaseSizeBeforeUpdate = itemSetRepository.findAll().size();

        // Update the itemSet
        ItemSet updatedItemSet = itemSetRepository.findOne(itemSet.getId());
        // Disconnect from session so that the updates on updatedItemSet are not directly saved in db
        em.detach(updatedItemSet);
        updatedItemSet
            .itemSetBez(UPDATED_ITEM_SET_BEZ);

        restItemSetMockMvc.perform(put("/api/item-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemSet)))
            .andExpect(status().isOk());

        // Validate the ItemSet in the database
        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeUpdate);
        ItemSet testItemSet = itemSetList.get(itemSetList.size() - 1);
        assertThat(testItemSet.getItemSetBez()).isEqualTo(UPDATED_ITEM_SET_BEZ);
    }

    @Test
    @Transactional
    public void updateNonExistingItemSet() throws Exception {
        int databaseSizeBeforeUpdate = itemSetRepository.findAll().size();

        // Create the ItemSet

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restItemSetMockMvc.perform(put("/api/item-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet)))
            .andExpect(status().isCreated());

        // Validate the ItemSet in the database
        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteItemSet() throws Exception {
        // Initialize the database
        itemSetRepository.saveAndFlush(itemSet);
        int databaseSizeBeforeDelete = itemSetRepository.findAll().size();

        // Get the itemSet
        restItemSetMockMvc.perform(delete("/api/item-sets/{id}", itemSet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ItemSet> itemSetList = itemSetRepository.findAll();
        assertThat(itemSetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemSet.class);
        ItemSet itemSet1 = new ItemSet();
        itemSet1.setId(1L);
        ItemSet itemSet2 = new ItemSet();
        itemSet2.setId(itemSet1.getId());
        assertThat(itemSet1).isEqualTo(itemSet2);
        itemSet2.setId(2L);
        assertThat(itemSet1).isNotEqualTo(itemSet2);
        itemSet1.setId(null);
        assertThat(itemSet1).isNotEqualTo(itemSet2);
    }
}
