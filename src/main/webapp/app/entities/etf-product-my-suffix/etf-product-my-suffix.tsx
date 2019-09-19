import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './etf-product-my-suffix.reducer';
import { IEtfProductMySuffix } from 'app/shared/model/etf-product-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfProductMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EtfProductMySuffix extends React.Component<IEtfProductMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { etfProductList, match } = this.props;
    return (
      <div>
        <h2 id="etf-product-my-suffix-heading">
          <Translate contentKey="etfTestV1App.etfProduct.home.title">Etf Products</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.etfProduct.home.createLabel">Create a new Etf Product</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {etfProductList && etfProductList.length > 0 ? (
            <Table responsive aria-describedby="etf-product-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.productCode">Product Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.productName">Product Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.fundCategory">Fund Category</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.inceptionDate">Inception Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.clearingHouse">Clearing House</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.exchage">Exchage</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.unitCreation">Unit Creation</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.unitPriceInitial">Unit Price Initial</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.unitPriceCurr">Unit Price Curr</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.lotPerBasket">Lot Per Basket</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.indexReff">Index Reff</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.rating">Rating</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.fee">Fee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.dealerParticipant">Dealer Participant</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.mi">Mi</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfProduct.bankCustody">Bank Custody</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etfProductList.map((etfProduct, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etfProduct.id}`} color="link" size="sm">
                        {etfProduct.id}
                      </Button>
                    </td>
                    <td>{etfProduct.productCode}</td>
                    <td>{etfProduct.productName}</td>
                    <td>{etfProduct.fundCategory}</td>
                    <td>
                      <TextFormat type="date" value={etfProduct.inceptionDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{etfProduct.clearingHouse}</td>
                    <td>{etfProduct.exchage}</td>
                    <td>{etfProduct.unitCreation}</td>
                    <td>{etfProduct.unitPriceInitial}</td>
                    <td>{etfProduct.unitPriceCurr}</td>
                    <td>{etfProduct.lotPerBasket}</td>
                    <td>{etfProduct.indexReff}</td>
                    <td>{etfProduct.rating}</td>
                    <td>{etfProduct.fee}</td>
                    <td>
                      {etfProduct.dealerParticipants
                        ? etfProduct.dealerParticipants.map((val, j) => (
                            <span key={j}>
                              <Link to={`dealer-participant-my-suffix/${val.id}`}>{val.id}</Link>
                              {j === etfProduct.dealerParticipants.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>{etfProduct.miId ? <Link to={`mi-my-suffix/${etfProduct.miId}`}>{etfProduct.miId}</Link> : ''}</td>
                    <td>
                      {etfProduct.bankCustodyId ? (
                        <Link to={`bank-custody-my-suffix/${etfProduct.bankCustodyId}`}>{etfProduct.bankCustodyId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etfProduct.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfProduct.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfProduct.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="etfTestV1App.etfProduct.home.notFound">No Etf Products found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etfProduct }: IRootState) => ({
  etfProductList: etfProduct.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfProductMySuffix);
