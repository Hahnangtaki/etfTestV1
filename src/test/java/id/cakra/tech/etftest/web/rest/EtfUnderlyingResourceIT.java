package id.cakra.tech.etftest.web.rest;

import id.cakra.tech.etftest.EtfTestV1App;
import id.cakra.tech.etftest.domain.EtfUnderlying;
import id.cakra.tech.etftest.repository.EtfUnderlyingRepository;
import id.cakra.tech.etftest.service.EtfUnderlyingService;
import id.cakra.tech.etftest.service.dto.EtfUnderlyingDTO;
import id.cakra.tech.etftest.service.mapper.EtfUnderlyingMapper;
import id.cakra.tech.etftest.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static id.cakra.tech.etftest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EtfUnderlyingResource} REST controller.
 */
@SpringBootTest(classes = EtfTestV1App.class)
public class EtfUnderlyingResourceIT {

    private static final LocalDate DEFAULT_EFFECTIVE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EFFECTIVE_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_EFFECTIVE_DATE = LocalDate.ofEpochDay(-1L);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private EtfUnderlyingRepository etfUnderlyingRepository;

    @Autowired
    private EtfUnderlyingMapper etfUnderlyingMapper;

    @Autowired
    private EtfUnderlyingService etfUnderlyingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEtfUnderlyingMockMvc;

    private EtfUnderlying etfUnderlying;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtfUnderlyingResource etfUnderlyingResource = new EtfUnderlyingResource(etfUnderlyingService);
        this.restEtfUnderlyingMockMvc = MockMvcBuilders.standaloneSetup(etfUnderlyingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtfUnderlying createEntity(EntityManager em) {
        EtfUnderlying etfUnderlying = new EtfUnderlying()
            .effectiveDate(DEFAULT_EFFECTIVE_DATE)
            .active(DEFAULT_ACTIVE);
        return etfUnderlying;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtfUnderlying createUpdatedEntity(EntityManager em) {
        EtfUnderlying etfUnderlying = new EtfUnderlying()
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .active(UPDATED_ACTIVE);
        return etfUnderlying;
    }

    @BeforeEach
    public void initTest() {
        etfUnderlying = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtfUnderlying() throws Exception {
        int databaseSizeBeforeCreate = etfUnderlyingRepository.findAll().size();

        // Create the EtfUnderlying
        EtfUnderlyingDTO etfUnderlyingDTO = etfUnderlyingMapper.toDto(etfUnderlying);
        restEtfUnderlyingMockMvc.perform(post("/api/etf-underlyings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfUnderlyingDTO)))
            .andExpect(status().isCreated());

        // Validate the EtfUnderlying in the database
        List<EtfUnderlying> etfUnderlyingList = etfUnderlyingRepository.findAll();
        assertThat(etfUnderlyingList).hasSize(databaseSizeBeforeCreate + 1);
        EtfUnderlying testEtfUnderlying = etfUnderlyingList.get(etfUnderlyingList.size() - 1);
        assertThat(testEtfUnderlying.getEffectiveDate()).isEqualTo(DEFAULT_EFFECTIVE_DATE);
        assertThat(testEtfUnderlying.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createEtfUnderlyingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etfUnderlyingRepository.findAll().size();

        // Create the EtfUnderlying with an existing ID
        etfUnderlying.setId(1L);
        EtfUnderlyingDTO etfUnderlyingDTO = etfUnderlyingMapper.toDto(etfUnderlying);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtfUnderlyingMockMvc.perform(post("/api/etf-underlyings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfUnderlyingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EtfUnderlying in the database
        List<EtfUnderlying> etfUnderlyingList = etfUnderlyingRepository.findAll();
        assertThat(etfUnderlyingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEtfUnderlyings() throws Exception {
        // Initialize the database
        etfUnderlyingRepository.saveAndFlush(etfUnderlying);

        // Get all the etfUnderlyingList
        restEtfUnderlyingMockMvc.perform(get("/api/etf-underlyings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etfUnderlying.getId().intValue())))
            .andExpect(jsonPath("$.[*].effectiveDate").value(hasItem(DEFAULT_EFFECTIVE_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEtfUnderlying() throws Exception {
        // Initialize the database
        etfUnderlyingRepository.saveAndFlush(etfUnderlying);

        // Get the etfUnderlying
        restEtfUnderlyingMockMvc.perform(get("/api/etf-underlyings/{id}", etfUnderlying.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etfUnderlying.getId().intValue()))
            .andExpect(jsonPath("$.effectiveDate").value(DEFAULT_EFFECTIVE_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEtfUnderlying() throws Exception {
        // Get the etfUnderlying
        restEtfUnderlyingMockMvc.perform(get("/api/etf-underlyings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtfUnderlying() throws Exception {
        // Initialize the database
        etfUnderlyingRepository.saveAndFlush(etfUnderlying);

        int databaseSizeBeforeUpdate = etfUnderlyingRepository.findAll().size();

        // Update the etfUnderlying
        EtfUnderlying updatedEtfUnderlying = etfUnderlyingRepository.findById(etfUnderlying.getId()).get();
        // Disconnect from session so that the updates on updatedEtfUnderlying are not directly saved in db
        em.detach(updatedEtfUnderlying);
        updatedEtfUnderlying
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .active(UPDATED_ACTIVE);
        EtfUnderlyingDTO etfUnderlyingDTO = etfUnderlyingMapper.toDto(updatedEtfUnderlying);

        restEtfUnderlyingMockMvc.perform(put("/api/etf-underlyings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfUnderlyingDTO)))
            .andExpect(status().isOk());

        // Validate the EtfUnderlying in the database
        List<EtfUnderlying> etfUnderlyingList = etfUnderlyingRepository.findAll();
        assertThat(etfUnderlyingList).hasSize(databaseSizeBeforeUpdate);
        EtfUnderlying testEtfUnderlying = etfUnderlyingList.get(etfUnderlyingList.size() - 1);
        assertThat(testEtfUnderlying.getEffectiveDate()).isEqualTo(UPDATED_EFFECTIVE_DATE);
        assertThat(testEtfUnderlying.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingEtfUnderlying() throws Exception {
        int databaseSizeBeforeUpdate = etfUnderlyingRepository.findAll().size();

        // Create the EtfUnderlying
        EtfUnderlyingDTO etfUnderlyingDTO = etfUnderlyingMapper.toDto(etfUnderlying);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtfUnderlyingMockMvc.perform(put("/api/etf-underlyings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfUnderlyingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EtfUnderlying in the database
        List<EtfUnderlying> etfUnderlyingList = etfUnderlyingRepository.findAll();
        assertThat(etfUnderlyingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtfUnderlying() throws Exception {
        // Initialize the database
        etfUnderlyingRepository.saveAndFlush(etfUnderlying);

        int databaseSizeBeforeDelete = etfUnderlyingRepository.findAll().size();

        // Delete the etfUnderlying
        restEtfUnderlyingMockMvc.perform(delete("/api/etf-underlyings/{id}", etfUnderlying.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtfUnderlying> etfUnderlyingList = etfUnderlyingRepository.findAll();
        assertThat(etfUnderlyingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtfUnderlying.class);
        EtfUnderlying etfUnderlying1 = new EtfUnderlying();
        etfUnderlying1.setId(1L);
        EtfUnderlying etfUnderlying2 = new EtfUnderlying();
        etfUnderlying2.setId(etfUnderlying1.getId());
        assertThat(etfUnderlying1).isEqualTo(etfUnderlying2);
        etfUnderlying2.setId(2L);
        assertThat(etfUnderlying1).isNotEqualTo(etfUnderlying2);
        etfUnderlying1.setId(null);
        assertThat(etfUnderlying1).isNotEqualTo(etfUnderlying2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtfUnderlyingDTO.class);
        EtfUnderlyingDTO etfUnderlyingDTO1 = new EtfUnderlyingDTO();
        etfUnderlyingDTO1.setId(1L);
        EtfUnderlyingDTO etfUnderlyingDTO2 = new EtfUnderlyingDTO();
        assertThat(etfUnderlyingDTO1).isNotEqualTo(etfUnderlyingDTO2);
        etfUnderlyingDTO2.setId(etfUnderlyingDTO1.getId());
        assertThat(etfUnderlyingDTO1).isEqualTo(etfUnderlyingDTO2);
        etfUnderlyingDTO2.setId(2L);
        assertThat(etfUnderlyingDTO1).isNotEqualTo(etfUnderlyingDTO2);
        etfUnderlyingDTO1.setId(null);
        assertThat(etfUnderlyingDTO1).isNotEqualTo(etfUnderlyingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(etfUnderlyingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(etfUnderlyingMapper.fromId(null)).isNull();
    }
}
