import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etf-product-my-suffix.reducer';
import { IEtfProductMySuffix } from 'app/shared/model/etf-product-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfProductMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtfProductMySuffixDetail extends React.Component<IEtfProductMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etfProductEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.etfProduct.detail.title">EtfProduct</Translate> [<b>{etfProductEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="productCode">
                <Translate contentKey="etfTestV1App.etfProduct.productCode">Product Code</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.productCode}</dd>
            <dt>
              <span id="productName">
                <Translate contentKey="etfTestV1App.etfProduct.productName">Product Name</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.productName}</dd>
            <dt>
              <span id="fundCategory">
                <Translate contentKey="etfTestV1App.etfProduct.fundCategory">Fund Category</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.fundCategory}</dd>
            <dt>
              <span id="inceptionDate">
                <Translate contentKey="etfTestV1App.etfProduct.inceptionDate">Inception Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={etfProductEntity.inceptionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="clearingHouse">
                <Translate contentKey="etfTestV1App.etfProduct.clearingHouse">Clearing House</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.clearingHouse}</dd>
            <dt>
              <span id="exchage">
                <Translate contentKey="etfTestV1App.etfProduct.exchage">Exchage</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.exchage}</dd>
            <dt>
              <span id="unitCreation">
                <Translate contentKey="etfTestV1App.etfProduct.unitCreation">Unit Creation</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.unitCreation}</dd>
            <dt>
              <span id="unitPriceInitial">
                <Translate contentKey="etfTestV1App.etfProduct.unitPriceInitial">Unit Price Initial</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.unitPriceInitial}</dd>
            <dt>
              <span id="unitPriceCurr">
                <Translate contentKey="etfTestV1App.etfProduct.unitPriceCurr">Unit Price Curr</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.unitPriceCurr}</dd>
            <dt>
              <span id="lotPerBasket">
                <Translate contentKey="etfTestV1App.etfProduct.lotPerBasket">Lot Per Basket</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.lotPerBasket}</dd>
            <dt>
              <span id="indexReff">
                <Translate contentKey="etfTestV1App.etfProduct.indexReff">Index Reff</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.indexReff}</dd>
            <dt>
              <span id="rating">
                <Translate contentKey="etfTestV1App.etfProduct.rating">Rating</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.rating}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="etfTestV1App.etfProduct.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{etfProductEntity.fee}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.etfProduct.dealerParticipant">Dealer Participant</Translate>
            </dt>
            <dd>
              {etfProductEntity.dealerParticipants
                ? etfProductEntity.dealerParticipants.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === etfProductEntity.dealerParticipants.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="etfTestV1App.etfProduct.mi">Mi</Translate>
            </dt>
            <dd>{etfProductEntity.miId ? etfProductEntity.miId : ''}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.etfProduct.bankCustody">Bank Custody</Translate>
            </dt>
            <dd>{etfProductEntity.bankCustodyId ? etfProductEntity.bankCustodyId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/etf-product-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etf-product-my-suffix/${etfProductEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etfProduct }: IRootState) => ({
  etfProductEntity: etfProduct.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfProductMySuffixDetail);
