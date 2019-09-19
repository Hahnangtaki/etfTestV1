import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './etf-execution-my-suffix.reducer';
import { IEtfExecutionMySuffix } from 'app/shared/model/etf-execution-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfExecutionMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EtfExecutionMySuffix extends React.Component<IEtfExecutionMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { etfExecutionList, match } = this.props;
    return (
      <div>
        <h2 id="etf-execution-my-suffix-heading">
          <Translate contentKey="etfTestV1App.etfExecution.home.title">Etf Executions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.etfExecution.home.createLabel">Create a new Etf Execution</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {etfExecutionList && etfExecutionList.length > 0 ? (
            <Table responsive aria-describedby="etf-execution-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.basketOrderId">Basket Order Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.stockCode">Stock Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.qty">Qty</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.qtyOdd">Qty Odd</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.price">Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.etfExecution.amount">Amount</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etfExecutionList.map((etfExecution, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etfExecution.id}`} color="link" size="sm">
                        {etfExecution.id}
                      </Button>
                    </td>
                    <td>{etfExecution.basketOrderId}</td>
                    <td>{etfExecution.stockCode}</td>
                    <td>{etfExecution.qty}</td>
                    <td>{etfExecution.qtyOdd}</td>
                    <td>{etfExecution.price}</td>
                    <td>{etfExecution.amount}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etfExecution.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfExecution.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etfExecution.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.etfExecution.home.notFound">No Etf Executions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etfExecution }: IRootState) => ({
  etfExecutionList: etfExecution.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfExecutionMySuffix);
