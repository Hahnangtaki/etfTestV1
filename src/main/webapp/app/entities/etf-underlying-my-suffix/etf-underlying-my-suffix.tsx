import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './etf-underlying-my-suffix.reducer';
import { IEtfUnderlyingMySuffix } from 'app/shared/model/etf-underlying-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfUnderlyingMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EtfUnderlyingMySuffix extends React.Component<IEtfUnderlyingMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { etfUnderlyingList, match } = this.props;
    return (
      <div>
        <h2 id="etf-underlying-my-suffix-heading">
          <Translate contentKey="etfTestV1App.etfUnderlying.home.title">Etf Underlyings</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.etfUnderlying.home.createLabel">Create a new Etf Underlying</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {etfUnderlyingList && etfUnderlyingList.length > 0 ? (
            <Table responsive aria-describedby="etf-underlying-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfUnderlying.effectiveDate">Effective Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfUnderlying.active">Active</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfUnderlying.etfProduct">Etf Product</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etfUnderlyingList.map((etfUnderlying, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etfUnderlying.id}`} color="link" size="sm">
                        {etfUnderlying.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={etfUnderlying.effectiveDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{etfUnderlying.active ? 'true' : 'false'}</td>
                    <td>
                      {etfUnderlying.etfProductId ? (
                        <Link to={`etf-product-my-suffix/${etfUnderlying.etfProductId}`}>{etfUnderlying.etfProductId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etfUnderlying.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfUnderlying.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfUnderlying.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.etfUnderlying.home.notFound">No Etf Underlyings found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etfUnderlying }: IRootState) => ({
  etfUnderlyingList: etfUnderlying.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfUnderlyingMySuffix);
