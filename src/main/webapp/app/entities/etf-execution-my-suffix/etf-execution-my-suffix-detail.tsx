import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etf-execution-my-suffix.reducer';
import { IEtfExecutionMySuffix } from 'app/shared/model/etf-execution-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfExecutionMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtfExecutionMySuffixDetail extends React.Component<IEtfExecutionMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etfExecutionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.etfExecution.detail.title">EtfExecution</Translate> [<b>{etfExecutionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="basketOrderId">
                <Translate contentKey="etfTestV1App.etfExecution.basketOrderId">Basket Order Id</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.basketOrderId}</dd>
            <dt>
              <span id="stockCode">
                <Translate contentKey="etfTestV1App.etfExecution.stockCode">Stock Code</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.stockCode}</dd>
            <dt>
              <span id="qty">
                <Translate contentKey="etfTestV1App.etfExecution.qty">Qty</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.qty}</dd>
            <dt>
              <span id="qtyOdd">
                <Translate contentKey="etfTestV1App.etfExecution.qtyOdd">Qty Odd</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.qtyOdd}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="etfTestV1App.etfExecution.price">Price</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.price}</dd>
            <dt>
              <span id="amount">
                <Translate contentKey="etfTestV1App.etfExecution.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{etfExecutionEntity.amount}</dd>
          </dl>
          <Button tag={Link} to="/entity/etf-execution-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etf-execution-my-suffix/${etfExecutionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etfExecution }: IRootState) => ({
  etfExecutionEntity: etfExecution.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfExecutionMySuffixDetail);
