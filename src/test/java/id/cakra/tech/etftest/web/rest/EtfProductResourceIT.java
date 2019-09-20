package id.cakra.tech.etftest.web.rest;

import id.cakra.tech.etftest.EtfTestV1App;
import id.cakra.tech.etftest.domain.EtfProduct;
import id.cakra.tech.etftest.repository.EtfProductRepository;
import id.cakra.tech.etftest.service.EtfProductService;
import id.cakra.tech.etftest.service.dto.EtfProductDTO;
import id.cakra.tech.etftest.service.mapper.EtfProductMapper;
import id.cakra.tech.etftest.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;

import static id.cakra.tech.etftest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EtfProductResource} REST controller.
 */
@SpringBootTest(classes = EtfTestV1App.class)
public class EtfProductResourceIT {

    private static final String DEFAULT_PRODUCT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FUND_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_FUND_CATEGORY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_INCEPTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INCEPTION_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_INCEPTION_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_CLEARING_HOUSE = "AAAAAAAAAA";
    private static final String UPDATED_CLEARING_HOUSE = "BBBBBBBBBB";

    private static final String DEFAULT_EXCHAGE = "AAAAAAAAAA";
    private static final String UPDATED_EXCHAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_UNIT_CREATION = 0;
    private static final Integer UPDATED_UNIT_CREATION = 1;
    private static final Integer SMALLER_UNIT_CREATION = 0 - 1;

    private static final Float DEFAULT_UNIT_PRICE_INITIAL = 1F;
    private static final Float UPDATED_UNIT_PRICE_INITIAL = 2F;
    private static final Float SMALLER_UNIT_PRICE_INITIAL = 1F - 1F;

    private static final Float DEFAULT_UNIT_PRICE_CURR = 1F;
    private static final Float UPDATED_UNIT_PRICE_CURR = 2F;
    private static final Float SMALLER_UNIT_PRICE_CURR = 1F - 1F;

    private static final Float DEFAULT_LOT_PER_BASKET = 1F;
    private static final Float UPDATED_LOT_PER_BASKET = 2F;
    private static final Float SMALLER_LOT_PER_BASKET = 1F - 1F;

    private static final String DEFAULT_INDEX_REFF = "AAAAAAAAAA";
    private static final String UPDATED_INDEX_REFF = "BBBBBBBBBB";

    private static final Float DEFAULT_RATING = 1F;
    private static final Float UPDATED_RATING = 2F;
    private static final Float SMALLER_RATING = 1F - 1F;

    private static final Float DEFAULT_FEE = 1F;
    private static final Float UPDATED_FEE = 2F;
    private static final Float SMALLER_FEE = 1F - 1F;

    @Autowired
    private EtfProductRepository etfProductRepository;

    @Mock
    private EtfProductRepository etfProductRepositoryMock;

    @Autowired
    private EtfProductMapper etfProductMapper;

    @Mock
    private EtfProductService etfProductServiceMock;

    @Autowired
    private EtfProductService etfProductService;

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

    private MockMvc restEtfProductMockMvc;

    private EtfProduct etfProduct;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtfProductResource etfProductResource = new EtfProductResource(etfProductService);
        this.restEtfProductMockMvc = MockMvcBuilders.standaloneSetup(etfProductResource)
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
    public static EtfProduct createEntity(EntityManager em) {
        EtfProduct etfProduct = new EtfProduct()
            .productCode(DEFAULT_PRODUCT_CODE)
            .productName(DEFAULT_PRODUCT_NAME)
            .fundCategory(DEFAULT_FUND_CATEGORY)
            .inceptionDate(DEFAULT_INCEPTION_DATE)
            .clearingHouse(DEFAULT_CLEARING_HOUSE)
            .exchage(DEFAULT_EXCHAGE)
            .unitCreation(DEFAULT_UNIT_CREATION)
            .unitPriceInitial(DEFAULT_UNIT_PRICE_INITIAL)
            .unitPriceCurr(DEFAULT_UNIT_PRICE_CURR)
            .lotPerBasket(DEFAULT_LOT_PER_BASKET)
            .indexReff(DEFAULT_INDEX_REFF)
            .rating(DEFAULT_RATING)
            .fee(DEFAULT_FEE);
        return etfProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtfProduct createUpdatedEntity(EntityManager em) {
        EtfProduct etfProduct = new EtfProduct()
            .productCode(UPDATED_PRODUCT_CODE)
            .productName(UPDATED_PRODUCT_NAME)
            .fundCategory(UPDATED_FUND_CATEGORY)
            .inceptionDate(UPDATED_INCEPTION_DATE)
            .clearingHouse(UPDATED_CLEARING_HOUSE)
            .exchage(UPDATED_EXCHAGE)
            .unitCreation(UPDATED_UNIT_CREATION)
            .unitPriceInitial(UPDATED_UNIT_PRICE_INITIAL)
            .unitPriceCurr(UPDATED_UNIT_PRICE_CURR)
            .lotPerBasket(UPDATED_LOT_PER_BASKET)
            .indexReff(UPDATED_INDEX_REFF)
            .rating(UPDATED_RATING)
            .fee(UPDATED_FEE);
        return etfProduct;
    }

    @BeforeEach
    public void initTest() {
        etfProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtfProduct() throws Exception {
        int databaseSizeBeforeCreate = etfProductRepository.findAll().size();

        // Create the EtfProduct
        EtfProductDTO etfProductDTO = etfProductMapper.toDto(etfProduct);
        restEtfProductMockMvc.perform(post("/api/etf-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfProductDTO)))
            .andExpect(status().isCreated());

        // Validate the EtfProduct in the database
        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeCreate + 1);
        EtfProduct testEtfProduct = etfProductList.get(etfProductList.size() - 1);
        assertThat(testEtfProduct.getProductCode()).isEqualTo(DEFAULT_PRODUCT_CODE);
        assertThat(testEtfProduct.getProductName()).isEqualTo(DEFAULT_PRODUCT_NAME);
        assertThat(testEtfProduct.getFundCategory()).isEqualTo(DEFAULT_FUND_CATEGORY);
        assertThat(testEtfProduct.getInceptionDate()).isEqualTo(DEFAULT_INCEPTION_DATE);
        assertThat(testEtfProduct.getClearingHouse()).isEqualTo(DEFAULT_CLEARING_HOUSE);
        assertThat(testEtfProduct.getExchage()).isEqualTo(DEFAULT_EXCHAGE);
        assertThat(testEtfProduct.getUnitCreation()).isEqualTo(DEFAULT_UNIT_CREATION);
        assertThat(testEtfProduct.getUnitPriceInitial()).isEqualTo(DEFAULT_UNIT_PRICE_INITIAL);
        assertThat(testEtfProduct.getUnitPriceCurr()).isEqualTo(DEFAULT_UNIT_PRICE_CURR);
        assertThat(testEtfProduct.getLotPerBasket()).isEqualTo(DEFAULT_LOT_PER_BASKET);
        assertThat(testEtfProduct.getIndexReff()).isEqualTo(DEFAULT_INDEX_REFF);
        assertThat(testEtfProduct.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testEtfProduct.getFee()).isEqualTo(DEFAULT_FEE);
    }

    @Test
    @Transactional
    public void createEtfProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etfProductRepository.findAll().size();

        // Create the EtfProduct with an existing ID
        etfProduct.setId(1L);
        EtfProductDTO etfProductDTO = etfProductMapper.toDto(etfProduct);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtfProductMockMvc.perform(post("/api/etf-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EtfProduct in the database
        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkProductCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = etfProductRepository.findAll().size();
        // set the field null
        etfProduct.setProductCode(null);

        // Create the EtfProduct, which fails.
        EtfProductDTO etfProductDTO = etfProductMapper.toDto(etfProduct);

        restEtfProductMockMvc.perform(post("/api/etf-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfProductDTO)))
            .andExpect(status().isBadRequest());

        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtfProducts() throws Exception {
        // Initialize the database
        etfProductRepository.saveAndFlush(etfProduct);

        // Get all the etfProductList
        restEtfProductMockMvc.perform(get("/api/etf-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etfProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].productCode").value(hasItem(DEFAULT_PRODUCT_CODE.toString())))
            .andExpect(jsonPath("$.[*].productName").value(hasItem(DEFAULT_PRODUCT_NAME.toString())))
            .andExpect(jsonPath("$.[*].fundCategory").value(hasItem(DEFAULT_FUND_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].inceptionDate").value(hasItem(DEFAULT_INCEPTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].clearingHouse").value(hasItem(DEFAULT_CLEARING_HOUSE.toString())))
            .andExpect(jsonPath("$.[*].exchage").value(hasItem(DEFAULT_EXCHAGE.toString())))
            .andExpect(jsonPath("$.[*].unitCreation").value(hasItem(DEFAULT_UNIT_CREATION)))
            .andExpect(jsonPath("$.[*].unitPriceInitial").value(hasItem(DEFAULT_UNIT_PRICE_INITIAL.doubleValue())))
            .andExpect(jsonPath("$.[*].unitPriceCurr").value(hasItem(DEFAULT_UNIT_PRICE_CURR.doubleValue())))
            .andExpect(jsonPath("$.[*].lotPerBasket").value(hasItem(DEFAULT_LOT_PER_BASKET.doubleValue())))
            .andExpect(jsonPath("$.[*].indexReff").value(hasItem(DEFAULT_INDEX_REFF.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())))
            .andExpect(jsonPath("$.[*].fee").value(hasItem(DEFAULT_FEE.doubleValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEtfProductsWithEagerRelationshipsIsEnabled() throws Exception {
        EtfProductResource etfProductResource = new EtfProductResource(etfProductServiceMock);
        when(etfProductServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEtfProductMockMvc = MockMvcBuilders.standaloneSetup(etfProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEtfProductMockMvc.perform(get("/api/etf-products?eagerload=true"))
        .andExpect(status().isOk());

        verify(etfProductServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEtfProductsWithEagerRelationshipsIsNotEnabled() throws Exception {
        EtfProductResource etfProductResource = new EtfProductResource(etfProductServiceMock);
            when(etfProductServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEtfProductMockMvc = MockMvcBuilders.standaloneSetup(etfProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEtfProductMockMvc.perform(get("/api/etf-products?eagerload=true"))
        .andExpect(status().isOk());

            verify(etfProductServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEtfProduct() throws Exception {
        // Initialize the database
        etfProductRepository.saveAndFlush(etfProduct);

        // Get the etfProduct
        restEtfProductMockMvc.perform(get("/api/etf-products/{id}", etfProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etfProduct.getId().intValue()))
            .andExpect(jsonPath("$.productCode").value(DEFAULT_PRODUCT_CODE.toString()))
            .andExpect(jsonPath("$.productName").value(DEFAULT_PRODUCT_NAME.toString()))
            .andExpect(jsonPath("$.fundCategory").value(DEFAULT_FUND_CATEGORY.toString()))
            .andExpect(jsonPath("$.inceptionDate").value(DEFAULT_INCEPTION_DATE.toString()))
            .andExpect(jsonPath("$.clearingHouse").value(DEFAULT_CLEARING_HOUSE.toString()))
            .andExpect(jsonPath("$.exchage").value(DEFAULT_EXCHAGE.toString()))
            .andExpect(jsonPath("$.unitCreation").value(DEFAULT_UNIT_CREATION))
            .andExpect(jsonPath("$.unitPriceInitial").value(DEFAULT_UNIT_PRICE_INITIAL.doubleValue()))
            .andExpect(jsonPath("$.unitPriceCurr").value(DEFAULT_UNIT_PRICE_CURR.doubleValue()))
            .andExpect(jsonPath("$.lotPerBasket").value(DEFAULT_LOT_PER_BASKET.doubleValue()))
            .andExpect(jsonPath("$.indexReff").value(DEFAULT_INDEX_REFF.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()))
            .andExpect(jsonPath("$.fee").value(DEFAULT_FEE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEtfProduct() throws Exception {
        // Get the etfProduct
        restEtfProductMockMvc.perform(get("/api/etf-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtfProduct() throws Exception {
        // Initialize the database
        etfProductRepository.saveAndFlush(etfProduct);

        int databaseSizeBeforeUpdate = etfProductRepository.findAll().size();

        // Update the etfProduct
        EtfProduct updatedEtfProduct = etfProductRepository.findById(etfProduct.getId()).get();
        // Disconnect from session so that the updates on updatedEtfProduct are not directly saved in db
        em.detach(updatedEtfProduct);
        updatedEtfProduct
            .productCode(UPDATED_PRODUCT_CODE)
            .productName(UPDATED_PRODUCT_NAME)
            .fundCategory(UPDATED_FUND_CATEGORY)
            .inceptionDate(UPDATED_INCEPTION_DATE)
            .clearingHouse(UPDATED_CLEARING_HOUSE)
            .exchage(UPDATED_EXCHAGE)
            .unitCreation(UPDATED_UNIT_CREATION)
            .unitPriceInitial(UPDATED_UNIT_PRICE_INITIAL)
            .unitPriceCurr(UPDATED_UNIT_PRICE_CURR)
            .lotPerBasket(UPDATED_LOT_PER_BASKET)
            .indexReff(UPDATED_INDEX_REFF)
            .rating(UPDATED_RATING)
            .fee(UPDATED_FEE);
        EtfProductDTO etfProductDTO = etfProductMapper.toDto(updatedEtfProduct);

        restEtfProductMockMvc.perform(put("/api/etf-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfProductDTO)))
            .andExpect(status().isOk());

        // Validate the EtfProduct in the database
        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeUpdate);
        EtfProduct testEtfProduct = etfProductList.get(etfProductList.size() - 1);
        assertThat(testEtfProduct.getProductCode()).isEqualTo(UPDATED_PRODUCT_CODE);
        assertThat(testEtfProduct.getProductName()).isEqualTo(UPDATED_PRODUCT_NAME);
        assertThat(testEtfProduct.getFundCategory()).isEqualTo(UPDATED_FUND_CATEGORY);
        assertThat(testEtfProduct.getInceptionDate()).isEqualTo(UPDATED_INCEPTION_DATE);
        assertThat(testEtfProduct.getClearingHouse()).isEqualTo(UPDATED_CLEARING_HOUSE);
        assertThat(testEtfProduct.getExchage()).isEqualTo(UPDATED_EXCHAGE);
        assertThat(testEtfProduct.getUnitCreation()).isEqualTo(UPDATED_UNIT_CREATION);
        assertThat(testEtfProduct.getUnitPriceInitial()).isEqualTo(UPDATED_UNIT_PRICE_INITIAL);
        assertThat(testEtfProduct.getUnitPriceCurr()).isEqualTo(UPDATED_UNIT_PRICE_CURR);
        assertThat(testEtfProduct.getLotPerBasket()).isEqualTo(UPDATED_LOT_PER_BASKET);
        assertThat(testEtfProduct.getIndexReff()).isEqualTo(UPDATED_INDEX_REFF);
        assertThat(testEtfProduct.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testEtfProduct.getFee()).isEqualTo(UPDATED_FEE);
    }

    @Test
    @Transactional
    public void updateNonExistingEtfProduct() throws Exception {
        int databaseSizeBeforeUpdate = etfProductRepository.findAll().size();

        // Create the EtfProduct
        EtfProductDTO etfProductDTO = etfProductMapper.toDto(etfProduct);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtfProductMockMvc.perform(put("/api/etf-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etfProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EtfProduct in the database
        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtfProduct() throws Exception {
        // Initialize the database
        etfProductRepository.saveAndFlush(etfProduct);

        int databaseSizeBeforeDelete = etfProductRepository.findAll().size();

        // Delete the etfProduct
        restEtfProductMockMvc.perform(delete("/api/etf-products/{id}", etfProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtfProduct> etfProductList = etfProductRepository.findAll();
        assertThat(etfProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtfProduct.class);
        EtfProduct etfProduct1 = new EtfProduct();
        etfProduct1.setId(1L);
        EtfProduct etfProduct2 = new EtfProduct();
        etfProduct2.setId(etfProduct1.getId());
        assertThat(etfProduct1).isEqualTo(etfProduct2);
        etfProduct2.setId(2L);
        assertThat(etfProduct1).isNotEqualTo(etfProduct2);
        etfProduct1.setId(null);
        assertThat(etfProduct1).isNotEqualTo(etfProduct2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtfProductDTO.class);
        EtfProductDTO etfProductDTO1 = new EtfProductDTO();
        etfProductDTO1.setId(1L);
        EtfProductDTO etfProductDTO2 = new EtfProductDTO();
        assertThat(etfProductDTO1).isNotEqualTo(etfProductDTO2);
        etfProductDTO2.setId(etfProductDTO1.getId());
        assertThat(etfProductDTO1).isEqualTo(etfProductDTO2);
        etfProductDTO2.setId(2L);
        assertThat(etfProductDTO1).isNotEqualTo(etfProductDTO2);
        etfProductDTO1.setId(null);
        assertThat(etfProductDTO1).isNotEqualTo(etfProductDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(etfProductMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(etfProductMapper.fromId(null)).isNull();
    }
}
