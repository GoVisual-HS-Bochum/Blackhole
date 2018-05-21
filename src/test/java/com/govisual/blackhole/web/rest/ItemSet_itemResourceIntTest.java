package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.ItemSet_item;
import com.govisual.blackhole.domain.ItemSet;
import com.govisual.blackhole.domain.Item;
import com.govisual.blackhole.repository.ItemSet_itemRepository;
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
 * Test class for the ItemSet_itemResource REST controller.
 *
 * @see ItemSet_itemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class ItemSet_itemResourceIntTest {

    private static final Integer DEFAULT_ANZAHL = 1;
    private static final Integer UPDATED_ANZAHL = 2;

    @Autowired
    private ItemSet_itemRepository itemSet_itemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItemSet_itemMockMvc;

    private ItemSet_item itemSet_item;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemSet_itemResource itemSet_itemResource = new ItemSet_itemResource(itemSet_itemRepository);
        this.restItemSet_itemMockMvc = MockMvcBuilders.standaloneSetup(itemSet_itemResource)
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
    public static ItemSet_item createEntity(EntityManager em) {
        ItemSet_item itemSet_item = new ItemSet_item()
            .anzahl(DEFAULT_ANZAHL);
        // Add required entity
        ItemSet itemSetBez = ItemSetResourceIntTest.createEntity(em);
        em.persist(itemSetBez);
        em.flush();
        itemSet_item.setItemSetBez(itemSetBez);
        // Add required entity
        Item bezeichnung = ItemResourceIntTest.createEntity(em);
        em.persist(bezeichnung);
        em.flush();
        itemSet_item.setBezeichnung(bezeichnung);
        return itemSet_item;
    }

    @Before
    public void initTest() {
        itemSet_item = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemSet_item() throws Exception {
        int databaseSizeBeforeCreate = itemSet_itemRepository.findAll().size();

        // Create the ItemSet_item
        restItemSet_itemMockMvc.perform(post("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet_item)))
            .andExpect(status().isCreated());

        // Validate the ItemSet_item in the database
        List<ItemSet_item> itemSet_itemList = itemSet_itemRepository.findAll();
        assertThat(itemSet_itemList).hasSize(databaseSizeBeforeCreate + 1);
        ItemSet_item testItemSet_item = itemSet_itemList.get(itemSet_itemList.size() - 1);
        assertThat(testItemSet_item.getAnzahl()).isEqualTo(DEFAULT_ANZAHL);
    }

    @Test
    @Transactional
    public void createItemSet_itemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemSet_itemRepository.findAll().size();

        // Create the ItemSet_item with an existing ID
        itemSet_item.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemSet_itemMockMvc.perform(post("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet_item)))
            .andExpect(status().isBadRequest());

        // Validate the ItemSet_item in the database
        List<ItemSet_item> itemSet_itemList = itemSet_itemRepository.findAll();
        assertThat(itemSet_itemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItemSet_items() throws Exception {
        // Initialize the database
        itemSet_itemRepository.saveAndFlush(itemSet_item);

        // Get all the itemSet_itemList
        restItemSet_itemMockMvc.perform(get("/api/item-set-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemSet_item.getId().intValue())))
            .andExpect(jsonPath("$.[*].anzahl").value(hasItem(DEFAULT_ANZAHL)));
    }

    @Test
    @Transactional
    public void getItemSet_item() throws Exception {
        // Initialize the database
        itemSet_itemRepository.saveAndFlush(itemSet_item);

        // Get the itemSet_item
        restItemSet_itemMockMvc.perform(get("/api/item-set-items/{id}", itemSet_item.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemSet_item.getId().intValue()))
            .andExpect(jsonPath("$.anzahl").value(DEFAULT_ANZAHL));
    }

    @Test
    @Transactional
    public void getNonExistingItemSet_item() throws Exception {
        // Get the itemSet_item
        restItemSet_itemMockMvc.perform(get("/api/item-set-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemSet_item() throws Exception {
        // Initialize the database
        itemSet_itemRepository.saveAndFlush(itemSet_item);
        int databaseSizeBeforeUpdate = itemSet_itemRepository.findAll().size();

        // Update the itemSet_item
        ItemSet_item updatedItemSet_item = itemSet_itemRepository.findOne(itemSet_item.getId());
        // Disconnect from session so that the updates on updatedItemSet_item are not directly saved in db
        em.detach(updatedItemSet_item);
        updatedItemSet_item
            .anzahl(UPDATED_ANZAHL);

        restItemSet_itemMockMvc.perform(put("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemSet_item)))
            .andExpect(status().isOk());

        // Validate the ItemSet_item in the database
        List<ItemSet_item> itemSet_itemList = itemSet_itemRepository.findAll();
        assertThat(itemSet_itemList).hasSize(databaseSizeBeforeUpdate);
        ItemSet_item testItemSet_item = itemSet_itemList.get(itemSet_itemList.size() - 1);
        assertThat(testItemSet_item.getAnzahl()).isEqualTo(UPDATED_ANZAHL);
    }

    @Test
    @Transactional
    public void updateNonExistingItemSet_item() throws Exception {
        int databaseSizeBeforeUpdate = itemSet_itemRepository.findAll().size();

        // Create the ItemSet_item

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restItemSet_itemMockMvc.perform(put("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSet_item)))
            .andExpect(status().isCreated());

        // Validate the ItemSet_item in the database
        List<ItemSet_item> itemSet_itemList = itemSet_itemRepository.findAll();
        assertThat(itemSet_itemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteItemSet_item() throws Exception {
        // Initialize the database
        itemSet_itemRepository.saveAndFlush(itemSet_item);
        int databaseSizeBeforeDelete = itemSet_itemRepository.findAll().size();

        // Get the itemSet_item
        restItemSet_itemMockMvc.perform(delete("/api/item-set-items/{id}", itemSet_item.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ItemSet_item> itemSet_itemList = itemSet_itemRepository.findAll();
        assertThat(itemSet_itemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemSet_item.class);
        ItemSet_item itemSet_item1 = new ItemSet_item();
        itemSet_item1.setId(1L);
        ItemSet_item itemSet_item2 = new ItemSet_item();
        itemSet_item2.setId(itemSet_item1.getId());
        assertThat(itemSet_item1).isEqualTo(itemSet_item2);
        itemSet_item2.setId(2L);
        assertThat(itemSet_item1).isNotEqualTo(itemSet_item2);
        itemSet_item1.setId(null);
        assertThat(itemSet_item1).isNotEqualTo(itemSet_item2);
    }
}
