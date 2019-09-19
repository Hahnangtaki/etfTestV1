import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './redemption-my-suffix.reducer';
import { IRedemptionMySuffix } from 'app/shared/model/redemption-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRedemptionMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RedemptionMySuffixDetail extends React.Component<IRedemptionMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { redemptionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.redemption.detail.title">Redemption</Translate> [<b>{redemptionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="redemptionCode">
                <Translate contentKey="etfTestV1App.redemption.redemptionCode">Redemption Code</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.redemptionCode}</dd>
            <dt>
              <span id="redemptionDate">
                <Translate contentKey="etfTestV1App.redemption.redemptionDate">Redemption Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={redemptionEntity.redemptionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="customerId">
                <Translate contentKey="etfTestV1App.redemption.customerId">Customer Id</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.customerId}</dd>
            <dt>
              <span id="customerName">
                <Translate contentKey="etfTestV1App.redemption.customerName">Customer Name</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.customerName}</dd>
            <dt>
              <span id="unitSellPriceInd">
                <Translate contentKey="etfTestV1App.redemption.unitSellPriceInd">Unit Sell Price Ind</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.unitSellPriceInd}</dd>
            <dt>
              <span id="unitSellPrice">
                <Translate contentKey="etfTestV1App.redemption.unitSellPrice">Unit Sell Price</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.unitSellPrice}</dd>
            <dt>
              <span id="unitSellUnit">
                <Translate contentKey="etfTestV1App.redemption.unitSellUnit">Unit Sell Unit</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.unitSellUnit}</dd>
            <dt>
              <span id="unitSellLot">
                <Translate contentKey="etfTestV1App.redemption.unitSellLot">Unit Sell Lot</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.unitSellLot}</dd>
            <dt>
              <span id="unitSellBasket">
                <Translate contentKey="etfTestV1App.redemption.unitSellBasket">Unit Sell Basket</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.unitSellBasket}</dd>
            <dt>
              <span id="market">
                <Translate contentKey="etfTestV1App.redemption.market">Market</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.market}</dd>
            <dt>
              <span id="sellGrossAmount">
                <Translate contentKey="etfTestV1App.redemption.sellGrossAmount">Sell Gross Amount</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.sellGrossAmount}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="etfTestV1App.redemption.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.fee}</dd>
            <dt>
              <span id="sellNetAmount">
                <Translate contentKey="etfTestV1App.redemption.sellNetAmount">Sell Net Amount</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.sellNetAmount}</dd>
            <dt>
              <span id="statusCash">
                <Translate contentKey="etfTestV1App.redemption.statusCash">Status Cash</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.statusCash}</dd>
            <dt>
              <span id="statusEtf">
                <Translate contentKey="etfTestV1App.redemption.statusEtf">Status Etf</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.statusEtf}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="etfTestV1App.redemption.status">Status</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.status}</dd>
            <dt>
              <span id="channel">
                <Translate contentKey="etfTestV1App.redemption.channel">Channel</Translate>
              </span>
            </dt>
            <dd>{redemptionEntity.channel}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.redemption.etfProduct">Etf Product</Translate>
            </dt>
            <dd>{redemptionEntity.etfProductId ? redemptionEntity.etfProductId : ''}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.redemption.dealerParticipant">Dealer Participant</Translate>
            </dt>
            <dd>{redemptionEntity.dealerParticipantId ? redemptionEntity.dealerParticipantId : ''}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.redemption.etfExecutionDtl">Etf Execution Dtl</Translate>
            </dt>
            <dd>{redemptionEntity.etfExecutionDtlId ? redemptionEntity.etfExecutionDtlId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/redemption-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/redemption-my-suffix/${redemptionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ redemption }: IRootState) => ({
  redemptionEntity: redemption.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedemptionMySuffixDetail);
