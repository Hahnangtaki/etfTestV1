import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDealerParticipantMySuffix } from 'app/shared/model/dealer-participant-my-suffix.model';
import { getEntities as getDealerParticipants } from 'app/entities/dealer-participant-my-suffix/dealer-participant-my-suffix.reducer';
import { IMiMySuffix } from 'app/shared/model/mi-my-suffix.model';
import { getEntities as getMis } from 'app/entities/mi-my-suffix/mi-my-suffix.reducer';
import { IBankCustodyMySuffix } from 'app/shared/model/bank-custody-my-suffix.model';
import { getEntities as getBankCustodies } from 'app/entities/bank-custody-my-suffix/bank-custody-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './etf-product-my-suffix.reducer';
import { IEtfProductMySuffix } from 'app/shared/model/etf-product-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtfProductMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtfProductMySuffixUpdateState {
  isNew: boolean;
  idsdealerParticipant: any[];
  miId: string;
  bankCustodyId: string;
}

export class EtfProductMySuffixUpdate extends React.Component<IEtfProductMySuffixUpdateProps, IEtfProductMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsdealerParticipant: [],
      miId: '0',
      bankCustodyId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDealerParticipants();
    this.props.getMis();
    this.props.getBankCustodies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { etfProductEntity } = this.props;
      const entity = {
        ...etfProductEntity,
        ...values,
        dealerParticipants: mapIdList(values.dealerParticipants)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/etf-product-my-suffix');
  };

  render() {
    const { etfProductEntity, dealerParticipants, mis, bankCustodies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="etfTestV1App.etfProduct.home.createOrEditLabel">
              <Translate contentKey="etfTestV1App.etfProduct.home.createOrEditLabel">Create or edit a EtfProduct</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : etfProductEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="etf-product-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="etf-product-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="productCodeLabel" for="etf-product-my-suffix-productCode">
                    <Translate contentKey="etfTestV1App.etfProduct.productCode">Product Code</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-productCode"
                    type="text"
                    name="productCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="productNameLabel" for="etf-product-my-suffix-productName">
                    <Translate contentKey="etfTestV1App.etfProduct.productName">Product Name</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-productName"
                    type="text"
                    name="productName"
                    validate={{
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fundCategoryLabel" for="etf-product-my-suffix-fundCategory">
                    <Translate contentKey="etfTestV1App.etfProduct.fundCategory">Fund Category</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-fundCategory"
                    type="text"
                    name="fundCategory"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="inceptionDateLabel" for="etf-product-my-suffix-inceptionDate">
                    <Translate contentKey="etfTestV1App.etfProduct.inceptionDate">Inception Date</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-inceptionDate" type="date" className="form-control" name="inceptionDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="clearingHouseLabel" for="etf-product-my-suffix-clearingHouse">
                    <Translate contentKey="etfTestV1App.etfProduct.clearingHouse">Clearing House</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-clearingHouse"
                    type="text"
                    name="clearingHouse"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="exchageLabel" for="etf-product-my-suffix-exchage">
                    <Translate contentKey="etfTestV1App.etfProduct.exchage">Exchage</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-exchage"
                    type="text"
                    name="exchage"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitCreationLabel" for="etf-product-my-suffix-unitCreation">
                    <Translate contentKey="etfTestV1App.etfProduct.unitCreation">Unit Creation</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-unitCreation"
                    type="string"
                    className="form-control"
                    name="unitCreation"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitPriceInitialLabel" for="etf-product-my-suffix-unitPriceInitial">
                    <Translate contentKey="etfTestV1App.etfProduct.unitPriceInitial">Unit Price Initial</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-unitPriceInitial" type="string" className="form-control" name="unitPriceInitial" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitPriceCurrLabel" for="etf-product-my-suffix-unitPriceCurr">
                    <Translate contentKey="etfTestV1App.etfProduct.unitPriceCurr">Unit Price Curr</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-unitPriceCurr" type="string" className="form-control" name="unitPriceCurr" />
                </AvGroup>
                <AvGroup>
                  <Label id="lotPerBasketLabel" for="etf-product-my-suffix-lotPerBasket">
                    <Translate contentKey="etfTestV1App.etfProduct.lotPerBasket">Lot Per Basket</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-lotPerBasket" type="string" className="form-control" name="lotPerBasket" />
                </AvGroup>
                <AvGroup>
                  <Label id="indexReffLabel" for="etf-product-my-suffix-indexReff">
                    <Translate contentKey="etfTestV1App.etfProduct.indexReff">Index Reff</Translate>
                  </Label>
                  <AvField
                    id="etf-product-my-suffix-indexReff"
                    type="text"
                    name="indexReff"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ratingLabel" for="etf-product-my-suffix-rating">
                    <Translate contentKey="etfTestV1App.etfProduct.rating">Rating</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-rating" type="string" className="form-control" name="rating" />
                </AvGroup>
                <AvGroup>
                  <Label id="feeLabel" for="etf-product-my-suffix-fee">
                    <Translate contentKey="etfTestV1App.etfProduct.fee">Fee</Translate>
                  </Label>
                  <AvField id="etf-product-my-suffix-fee" type="string" className="form-control" name="fee" />
                </AvGroup>
                <AvGroup>
                  <Label for="etf-product-my-suffix-dealerParticipant">
                    <Translate contentKey="etfTestV1App.etfProduct.dealerParticipant">Dealer Participant</Translate>
                  </Label>
                  <AvInput
                    id="etf-product-my-suffix-dealerParticipant"
                    type="select"
                    multiple
                    className="form-control"
                    name="dealerParticipants"
                    value={etfProductEntity.dealerParticipants && etfProductEntity.dealerParticipants.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {dealerParticipants
                      ? dealerParticipants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="etf-product-my-suffix-mi">
                    <Translate contentKey="etfTestV1App.etfProduct.mi">Mi</Translate>
                  </Label>
                  <AvInput id="etf-product-my-suffix-mi" type="select" className="form-control" name="miId">
                    <option value="" key="0" />
                    {mis
                      ? mis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="etf-product-my-suffix-bankCustody">
                    <Translate contentKey="etfTestV1App.etfProduct.bankCustody">Bank Custody</Translate>
                  </Label>
                  <AvInput id="etf-product-my-suffix-bankCustody" type="select" className="form-control" name="bankCustodyId">
                    <option value="" key="0" />
                    {bankCustodies
                      ? bankCustodies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/etf-product-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  dealerParticipants: storeState.dealerParticipant.entities,
  mis: storeState.mi.entities,
  bankCustodies: storeState.bankCustody.entities,
  etfProductEntity: storeState.etfProduct.entity,
  loading: storeState.etfProduct.loading,
  updating: storeState.etfProduct.updating,
  updateSuccess: storeState.etfProduct.updateSuccess
});

const mapDispatchToProps = {
  getDealerParticipants,
  getMis,
  getBankCustodies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfProductMySuffixUpdate);
