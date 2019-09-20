import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './etf-history-my-suffix.reducer';
import { IEtfHistoryMySuffix } from 'app/shared/model/etf-history-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfHistoryMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EtfHistoryMySuffix extends React.Component<IEtfHistoryMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { etfHistoryList, match } = this.props;
    return (
      <div>
        <h2 id="etf-history-my-suffix-heading">
          <Translate contentKey="etfTestV1App.etfHistory.home.title">Etf Histories</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.etfHistory.home.createLabel">Create a new Etf History</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {etfHistoryList && etfHistoryList.length > 0 ? (
            <Table responsive aria-describedby="etf-history-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfHistory.valueDate">Value Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfHistory.unitPrice">Unit Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfHistory.unitQty">Unit Qty</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfHistory.aum">Aum</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfHistory.etfProduct">Etf Product</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etfHistoryList.map((etfHistory, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etfHistory.id}`} color="link" size="sm">
                        {etfHistory.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={etfHistory.valueDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{etfHistory.unitPrice}</td>
                    <td>{etfHistory.unitQty}</td>
                    <td>{etfHistory.aum}</td>
                    <td>
                      {etfHistory.etfProductId ? (
                        <Link to={`etf-product-my-suffix/${etfHistory.etfProductId}`}>{etfHistory.etfProductId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etfHistory.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfHistory.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfHistory.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.etfHistory.home.notFound">No Etf Histories found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etfHistory }: IRootState) => ({
  etfHistoryList: etfHistory.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfHistoryMySuffix);
