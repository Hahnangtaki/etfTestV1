import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etf-history-my-suffix.reducer';
import { IEtfHistoryMySuffix } from 'app/shared/model/etf-history-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfHistoryMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtfHistoryMySuffixDetail extends React.Component<IEtfHistoryMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etfHistoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.etfHistory.detail.title">EtfHistory</Translate> [<b>{etfHistoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valueDate">
                <Translate contentKey="etfTestV1App.etfHistory.valueDate">Value Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={etfHistoryEntity.valueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="unitPrice">
                <Translate contentKey="etfTestV1App.etfHistory.unitPrice">Unit Price</Translate>
              </span>
            </dt>
            <dd>{etfHistoryEntity.unitPrice}</dd>
            <dt>
              <span id="unitQty">
                <Translate contentKey="etfTestV1App.etfHistory.unitQty">Unit Qty</Translate>
              </span>
            </dt>
            <dd>{etfHistoryEntity.unitQty}</dd>
            <dt>
              <span id="aum">
                <Translate contentKey="etfTestV1App.etfHistory.aum">Aum</Translate>
              </span>
            </dt>
            <dd>{etfHistoryEntity.aum}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.etfHistory.etfProduct">Etf Product</Translate>
            </dt>
            <dd>{etfHistoryEntity.etfProductId ? etfHistoryEntity.etfProductId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/etf-history-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etf-history-my-suffix/${etfHistoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etfHistory }: IRootState) => ({
  etfHistoryEntity: etfHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfHistoryMySuffixDetail);
