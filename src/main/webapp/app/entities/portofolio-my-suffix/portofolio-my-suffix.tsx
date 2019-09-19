import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './portofolio-my-suffix.reducer';
import { IPortofolioMySuffix } from 'app/shared/model/portofolio-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPortofolioMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class PortofolioMySuffix extends React.Component<IPortofolioMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { portofolioList, match } = this.props;
    return (
      <div>
        <h2 id="portofolio-my-suffix-heading">
          <Translate contentKey="etfTestV1App.portofolio.home.title">Portofolios</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.portofolio.home.createLabel">Create a new Portofolio</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {portofolioList && portofolioList.length > 0 ? (
            <Table responsive aria-describedby="portofolio-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.portofolio.customerId">Customer Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.portofolio.portofolioDate">Portofolio Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.portofolio.unit">Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.portofolio.avgPrice">Avg Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.portofolio.etfProduct">Etf Product</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {portofolioList.map((portofolio, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${portofolio.id}`} color="link" size="sm">
                        {portofolio.id}
                      </Button>
                    </td>
                    <td>{portofolio.customerId}</td>
                    <td>
                      <TextFormat type="date" value={portofolio.portofolioDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{portofolio.unit}</td>
                    <td>{portofolio.avgPrice}</td>
                    <td>
                      {portofolio.etfProductId ? (
                        <Link to={`etf-product-my-suffix/${portofolio.etfProductId}`}>{portofolio.etfProductId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${portofolio.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${portofolio.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${portofolio.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.portofolio.home.notFound">No Portofolios found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ portofolio }: IRootState) => ({
  portofolioList: portofolio.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortofolioMySuffix);
