import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './portofolio-my-suffix.reducer';
import { IPortofolioMySuffix } from 'app/shared/model/portofolio-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPortofolioMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PortofolioMySuffixDetail extends React.Component<IPortofolioMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { portofolioEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.portofolio.detail.title">Portofolio</Translate> [<b>{portofolioEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="customerId">
                <Translate contentKey="etfTestV1App.portofolio.customerId">Customer Id</Translate>
              </span>
            </dt>
            <dd>{portofolioEntity.customerId}</dd>
            <dt>
              <span id="portofolioDate">
                <Translate contentKey="etfTestV1App.portofolio.portofolioDate">Portofolio Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={portofolioEntity.portofolioDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="unit">
                <Translate contentKey="etfTestV1App.portofolio.unit">Unit</Translate>
              </span>
            </dt>
            <dd>{portofolioEntity.unit}</dd>
            <dt>
              <span id="avgPrice">
                <Translate contentKey="etfTestV1App.portofolio.avgPrice">Avg Price</Translate>
              </span>
            </dt>
            <dd>{portofolioEntity.avgPrice}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.portofolio.etfProduct">Etf Product</Translate>
            </dt>
            <dd>{portofolioEntity.etfProductId ? portofolioEntity.etfProductId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/portofolio-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/portofolio-my-suffix/${portofolioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ portofolio }: IRootState) => ({
  portofolioEntity: portofolio.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortofolioMySuffixDetail);
