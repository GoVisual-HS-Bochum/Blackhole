package com.govisual.blackhole.web.rest;

import com.govisual.blackhole.BlackholeApp;

import com.govisual.blackhole.domain.ItemSetItem;
import com.govisual.blackhole.domain.ItemSet;
import com.govisual.blackhole.domain.Item;
import com.govisual.blackhole.repository.ItemSetItemRepository;
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
 * Test class for the ItemSetItemResource REST controller.
 *
 * @see ItemSetItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlackholeApp.class)
public class ItemSetItemResourceIntTest {

    private static final Integer DEFAULT_ANZAHL = 1;
    private static final Integer UPDATED_ANZAHL = 2;

    @Autowired
    private ItemSetItemRepository itemSetItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItemSetItemMockMvc;

    private ItemSetItem itemSetItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemSetItemResource itemSetItemResource = new ItemSetItemResource(itemSetItemRepository);
        this.restItemSetItemMockMvc = MockMvcBuilders.standaloneSetup(itemSetItemResource)
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
    public static ItemSetItem createEntity(EntityManager em) {
        ItemSetItem itemSetItem = new ItemSetItem()
            .anzahl(DEFAULT_ANZAHL);
        // Add required entity
        ItemSet itemSetBez = ItemSetResourceIntTest.createEntity(em);
        em.persist(itemSetBez);
        em.flush();
        itemSetItem.setItemSetBez(itemSetBez);
        // Add required entity
        Item itemBez = ItemResourceIntTest.createEntity(em);
        em.persist(itemBez);
        em.flush();
        itemSetItem.setItemBez(itemBez);
        return itemSetItem;
    }

    @Before
    public void initTest() {
        itemSetItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemSetItem() throws Exception {
        int databaseSizeBeforeCreate = itemSetItemRepository.findAll().size();

        // Create the ItemSetItem
        restItemSetItemMockMvc.perform(post("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSetItem)))
            .andExpect(status().isCreated());

        // Validate the ItemSetItem in the database
        List<ItemSetItem> itemSetItemList = itemSetItemRepository.findAll();
        assertThat(itemSetItemList).hasSize(databaseSizeBeforeCreate + 1);
        ItemSetItem testItemSetItem = itemSetItemList.get(itemSetItemList.size() - 1);
        assertThat(testItemSetItem.getAnzahl()).isEqualTo(DEFAULT_ANZAHL);
    }

    @Test
    @Transactional
    public void createItemSetItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemSetItemRepository.findAll().size();

        // Create the ItemSetItem with an existing ID
        itemSetItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemSetItemMockMvc.perform(post("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSetItem)))
            .andExpect(status().isBadRequest());

        // Validate the ItemSetItem in the database
        List<ItemSetItem> itemSetItemList = itemSetItemRepository.findAll();
        assertThat(itemSetItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItemSetItems() throws Exception {
        // Initialize the database
        itemSetItemRepository.saveAndFlush(itemSetItem);

        // Get all the itemSetItemList
        restItemSetItemMockMvc.perform(get("/api/item-set-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemSetItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].anzahl").value(hasItem(DEFAULT_ANZAHL)));
    }

    @Test
    @Transactional
    public void getItemSetItem() throws Exception {
        // Initialize the database
        itemSetItemRepository.saveAndFlush(itemSetItem);

        // Get the itemSetItem
        restItemSetItemMockMvc.perform(get("/api/item-set-items/{id}", itemSetItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemSetItem.getId().intValue()))
            .andExpect(jsonPath("$.anzahl").value(DEFAULT_ANZAHL));
    }

    @Test
    @Transactional
    public void getNonExistingItemSetItem() throws Exception {
        // Get the itemSetItem
        restItemSetItemMockMvc.perform(get("/api/item-set-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemSetItem() throws Exception {
        // Initialize the database
        itemSetItemRepository.saveAndFlush(itemSetItem);
        int databaseSizeBeforeUpdate = itemSetItemRepository.findAll().size();

        // Update the itemSetItem
        ItemSetItem updatedItemSetItem = itemSetItemRepository.findOne(itemSetItem.getId());
        // Disconnect from session so that the updates on updatedItemSetItem are not directly saved in db
        em.detach(updatedItemSetItem);
        updatedItemSetItem
            .anzahl(UPDATED_ANZAHL);

        restItemSetItemMockMvc.perform(put("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemSetItem)))
            .andExpect(status().isOk());

        // Validate the ItemSetItem in the database
        List<ItemSetItem> itemSetItemList = itemSetItemRepository.findAll();
        assertThat(itemSetItemList).hasSize(databaseSizeBeforeUpdate);
        ItemSetItem testItemSetItem = itemSetItemList.get(itemSetItemList.size() - 1);
        assertThat(testItemSetItem.getAnzahl()).isEqualTo(UPDATED_ANZAHL);
    }

    @Test
    @Transactional
    public void updateNonExistingItemSetItem() throws Exception {
        int databaseSizeBeforeUpdate = itemSetItemRepository.findAll().size();

        // Create the ItemSetItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restItemSetItemMockMvc.perform(put("/api/item-set-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemSetItem)))
            .andExpect(status().isCreated());

        // Validate the ItemSetItem in the database
        List<ItemSetItem> itemSetItemList = itemSetItemRepository.findAll();
        assertThat(itemSetItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteItemSetItem() throws Exception {
        // Initialize the database
        itemSetItemRepository.saveAndFlush(itemSetItem);
        int databaseSizeBeforeDelete = itemSetItemRepository.findAll().size();

        // Get the itemSetItem
        restItemSetItemMockMvc.perform(delete("/api/item-set-items/{id}", itemSetItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ItemSetItem> itemSetItemList = itemSetItemRepository.findAll();
        assertThat(itemSetItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemSetItem.class);
        ItemSetItem itemSetItem1 = new ItemSetItem();
        itemSetItem1.setId(1L);
        ItemSetItem itemSetItem2 = new ItemSetItem();
        itemSetItem2.setId(itemSetItem1.getId());
        assertThat(itemSetItem1).isEqualTo(itemSetItem2);
        itemSetItem2.setId(2L);
        assertThat(itemSetItem1).isNotEqualTo(itemSetItem2);
        itemSetItem1.setId(null);
        assertThat(itemSetItem1).isNotEqualTo(itemSetItem2);
    }
}
