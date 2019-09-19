import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEtfProductMySuffix } from 'app/shared/model/etf-product-my-suffix.model';
import { getEntities as getEtfProducts } from 'app/entities/etf-product-my-suffix/etf-product-my-suffix.reducer';
import { IDealerParticipantMySuffix } from 'app/shared/model/dealer-participant-my-suffix.model';
import { getEntities as getDealerParticipants } from 'app/entities/dealer-participant-my-suffix/dealer-participant-my-suffix.reducer';
import { IEtfExecutionDtlMySuffix } from 'app/shared/model/etf-execution-dtl-my-suffix.model';
import { getEntities as getEtfExecutionDtls } from 'app/entities/etf-execution-dtl-my-suffix/etf-execution-dtl-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './redemption-my-suffix.reducer';
import { IRedemptionMySuffix } from 'app/shared/model/redemption-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRedemptionMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRedemptionMySuffixUpdateState {
  isNew: boolean;
  etfProductId: string;
  dealerParticipantId: string;
  etfExecutionDtlId: string;
}

export class RedemptionMySuffixUpdate extends React.Component<IRedemptionMySuffixUpdateProps, IRedemptionMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      etfProductId: '0',
      dealerParticipantId: '0',
      etfExecutionDtlId: '0',
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

    this.props.getEtfProducts();
    this.props.getDealerParticipants();
    this.props.getEtfExecutionDtls();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { redemptionEntity } = this.props;
      const entity = {
        ...redemptionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/redemption-my-suffix');
  };

  render() {
    const { redemptionEntity, etfProducts, dealerParticipants, etfExecutionDtls, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="etfTestV1App.redemption.home.createOrEditLabel">
              <Translate contentKey="etfTestV1App.redemption.home.createOrEditLabel">Create or edit a Redemption</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : redemptionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="redemption-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="redemption-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="redemptionCodeLabel" for="redemption-my-suffix-redemptionCode">
                    <Translate contentKey="etfTestV1App.redemption.redemptionCode">Redemption Code</Translate>
                  </Label>
                  <AvField
                    id="redemption-my-suffix-redemptionCode"
                    type="text"
                    name="redemptionCode"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="redemptionDateLabel" for="redemption-my-suffix-redemptionDate">
                    <Translate contentKey="etfTestV1App.redemption.redemptionDate">Redemption Date</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-redemptionDate" type="date" className="form-control" name="redemptionDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerIdLabel" for="redemption-my-suffix-customerId">
                    <Translate contentKey="etfTestV1App.redemption.customerId">Customer Id</Translate>
                  </Label>
                  <AvField
                    id="redemption-my-suffix-customerId"
                    type="text"
                    name="customerId"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerNameLabel" for="redemption-my-suffix-customerName">
                    <Translate contentKey="etfTestV1App.redemption.customerName">Customer Name</Translate>
                  </Label>
                  <AvField
                    id="redemption-my-suffix-customerName"
                    type="text"
                    name="customerName"
                    validate={{
                      maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unitSellPriceIndLabel" for="redemption-my-suffix-unitSellPriceInd">
                    <Translate contentKey="etfTestV1App.redemption.unitSellPriceInd">Unit Sell Price Ind</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-unitSellPriceInd" type="string" className="form-control" name="unitSellPriceInd" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitSellPriceLabel" for="redemption-my-suffix-unitSellPrice">
                    <Translate contentKey="etfTestV1App.redemption.unitSellPrice">Unit Sell Price</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-unitSellPrice" type="string" className="form-control" name="unitSellPrice" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitSellUnitLabel" for="redemption-my-suffix-unitSellUnit">
                    <Translate contentKey="etfTestV1App.redemption.unitSellUnit">Unit Sell Unit</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-unitSellUnit" type="string" className="form-control" name="unitSellUnit" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitSellLotLabel" for="redemption-my-suffix-unitSellLot">
                    <Translate contentKey="etfTestV1App.redemption.unitSellLot">Unit Sell Lot</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-unitSellLot" type="string" className="form-control" name="unitSellLot" />
                </AvGroup>
                <AvGroup>
                  <Label id="unitSellBasketLabel" for="redemption-my-suffix-unitSellBasket">
                    <Translate contentKey="etfTestV1App.redemption.unitSellBasket">Unit Sell Basket</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-unitSellBasket" type="string" className="form-control" name="unitSellBasket" />
                </AvGroup>
                <AvGroup>
                  <Label id="marketLabel" for="redemption-my-suffix-market">
                    <Translate contentKey="etfTestV1App.redemption.market">Market</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-market" type="text" name="market" />
                </AvGroup>
                <AvGroup>
                  <Label id="sellGrossAmountLabel" for="redemption-my-suffix-sellGrossAmount">
                    <Translate contentKey="etfTestV1App.redemption.sellGrossAmount">Sell Gross Amount</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-sellGrossAmount" type="string" className="form-control" name="sellGrossAmount" />
                </AvGroup>
                <AvGroup>
                  <Label id="feeLabel" for="redemption-my-suffix-fee">
                    <Translate contentKey="etfTestV1App.redemption.fee">Fee</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-fee" type="string" className="form-control" name="fee" />
                </AvGroup>
                <AvGroup>
                  <Label id="sellNetAmountLabel" for="redemption-my-suffix-sellNetAmount">
                    <Translate contentKey="etfTestV1App.redemption.sellNetAmount">Sell Net Amount</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-sellNetAmount" type="string" className="form-control" name="sellNetAmount" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusCashLabel" for="redemption-my-suffix-statusCash">
                    <Translate contentKey="etfTestV1App.redemption.statusCash">Status Cash</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-statusCash" type="text" name="statusCash" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusEtfLabel" for="redemption-my-suffix-statusEtf">
                    <Translate contentKey="etfTestV1App.redemption.statusEtf">Status Etf</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-statusEtf" type="text" name="statusEtf" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="redemption-my-suffix-status">
                    <Translate contentKey="etfTestV1App.redemption.status">Status</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelLabel" for="redemption-my-suffix-channel">
                    <Translate contentKey="etfTestV1App.redemption.channel">Channel</Translate>
                  </Label>
                  <AvField id="redemption-my-suffix-channel" type="string" className="form-control" name="channel" />
                </AvGroup>
                <AvGroup>
                  <Label for="redemption-my-suffix-etfProduct">
                    <Translate contentKey="etfTestV1App.redemption.etfProduct">Etf Product</Translate>
                  </Label>
                  <AvInput id="redemption-my-suffix-etfProduct" type="select" className="form-control" name="etfProductId">
                    <option value="" key="0" />
                    {etfProducts
                      ? etfProducts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="redemption-my-suffix-dealerParticipant">
                    <Translate contentKey="etfTestV1App.redemption.dealerParticipant">Dealer Participant</Translate>
                  </Label>
                  <AvInput id="redemption-my-suffix-dealerParticipant" type="select" className="form-control" name="dealerParticipantId">
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
                  <Label for="redemption-my-suffix-etfExecutionDtl">
                    <Translate contentKey="etfTestV1App.redemption.etfExecutionDtl">Etf Execution Dtl</Translate>
                  </Label>
                  <AvInput id="redemption-my-suffix-etfExecutionDtl" type="select" className="form-control" name="etfExecutionDtlId">
                    <option value="" key="0" />
                    {etfExecutionDtls
                      ? etfExecutionDtls.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/redemption-my-suffix" replace color="info">
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
  etfProducts: storeState.etfProduct.entities,
  dealerParticipants: storeState.dealerParticipant.entities,
  etfExecutionDtls: storeState.etfExecutionDtl.entities,
  redemptionEntity: storeState.redemption.entity,
  loading: storeState.redemption.loading,
  updating: storeState.redemption.updating,
  updateSuccess: storeState.redemption.updateSuccess
});

const mapDispatchToProps = {
  getEtfProducts,
  getDealerParticipants,
  getEtfExecutionDtls,
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
)(RedemptionMySuffixUpdate);
