import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './subscript-my-suffix.reducer';
import { ISubscriptMySuffix } from 'app/shared/model/subscript-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubscriptMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SubscriptMySuffixDetail extends React.Component<ISubscriptMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { subscriptEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.subscript.detail.title">Subscript</Translate> [<b>{subscriptEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="subscriptCode">
                <Translate contentKey="etfTestV1App.subscript.subscriptCode">Subscript Code</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.subscriptCode}</dd>
            <dt>
              <span id="subscriptDate">
                <Translate contentKey="etfTestV1App.subscript.subscriptDate">Subscript Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={subscriptEntity.subscriptDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="customerId">
                <Translate contentKey="etfTestV1App.subscript.customerId">Customer Id</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.customerId}</dd>
            <dt>
              <span id="customerName">
                <Translate contentKey="etfTestV1App.subscript.customerName">Customer Name</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.customerName}</dd>
            <dt>
              <span id="unitBuyPriceInd">
                <Translate contentKey="etfTestV1App.subscript.unitBuyPriceInd">Unit Buy Price Ind</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.unitBuyPriceInd}</dd>
            <dt>
              <span id="unitBuyPrice">
                <Translate contentKey="etfTestV1App.subscript.unitBuyPrice">Unit Buy Price</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.unitBuyPrice}</dd>
            <dt>
              <span id="unitBuyUnit">
                <Translate contentKey="etfTestV1App.subscript.unitBuyUnit">Unit Buy Unit</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.unitBuyUnit}</dd>
            <dt>
              <span id="unitBuyLot">
                <Translate contentKey="etfTestV1App.subscript.unitBuyLot">Unit Buy Lot</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.unitBuyLot}</dd>
            <dt>
              <span id="unitBuyBasket">
                <Translate contentKey="etfTestV1App.subscript.unitBuyBasket">Unit Buy Basket</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.unitBuyBasket}</dd>
            <dt>
              <span id="market">
                <Translate contentKey="etfTestV1App.subscript.market">Market</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.market}</dd>
            <dt>
              <span id="buyGrossAmount">
                <Translate contentKey="etfTestV1App.subscript.buyGrossAmount">Buy Gross Amount</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.buyGrossAmount}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="etfTestV1App.subscript.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.fee}</dd>
            <dt>
              <span id="buyNetAmount">
                <Translate contentKey="etfTestV1App.subscript.buyNetAmount">Buy Net Amount</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.buyNetAmount}</dd>
            <dt>
              <span id="statusCash">
                <Translate contentKey="etfTestV1App.subscript.statusCash">Status Cash</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.statusCash}</dd>
            <dt>
              <span id="statusEtf">
                <Translate contentKey="etfTestV1App.subscript.statusEtf">Status Etf</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.statusEtf}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="etfTestV1App.subscript.status">Status</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.status}</dd>
            <dt>
              <span id="channel">
                <Translate contentKey="etfTestV1App.subscript.channel">Channel</Translate>
              </span>
            </dt>
            <dd>{subscriptEntity.channel}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.subscript.etfProduct">Etf Product</Translate>
            </dt>
            <dd>{subscriptEntity.etfProductId ? subscriptEntity.etfProductId : ''}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.subscript.dealerParticipant">Dealer Participant</Translate>
            </dt>
            <dd>{subscriptEntity.dealerParticipantId ? subscriptEntity.dealerParticipantId : ''}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.subscript.etfExecutionDtl">Etf Execution Dtl</Translate>
            </dt>
            <dd>{subscriptEntity.etfExecutionDtlId ? subscriptEntity.etfExecutionDtlId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/subscript-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/subscript-my-suffix/${subscriptEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ subscript }: IRootState) => ({
  subscriptEntity: subscript.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptMySuffixDetail);
