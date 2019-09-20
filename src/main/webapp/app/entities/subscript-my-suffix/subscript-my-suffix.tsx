import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './subscript-my-suffix.reducer';
import { ISubscriptMySuffix } from 'app/shared/model/subscript-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubscriptMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SubscriptMySuffix extends React.Component<ISubscriptMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { subscriptList, match } = this.props;
    return (
      <div>
        <h2 id="subscript-my-suffix-heading">
          <Translate contentKey="etfTestV1App.subscript.home.title">Subscripts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.subscript.home.createLabel">Create a new Subscript</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {subscriptList && subscriptList.length > 0 ? (
            <Table responsive aria-describedby="subscript-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.subscriptCode">Subscript Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.subscriptDate">Subscript Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.customerId">Customer Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.customerName">Customer Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.unitBuyPriceInd">Unit Buy Price Ind</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.unitBuyPrice">Unit Buy Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.unitBuyUnit">Unit Buy Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.unitBuyLot">Unit Buy Lot</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.unitBuyBasket">Unit Buy Basket</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.market">Market</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.buyGrossAmount">Buy Gross Amount</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.fee">Fee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.buyNetAmount">Buy Net Amount</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.statusCash">Status Cash</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.statusEtf">Status Etf</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.channel">Channel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.etfProduct">Etf Product</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.dealerParticipant">Dealer Participant</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.subscript.etfExecutionDtl">Etf Execution Dtl</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {subscriptList.map((subscript, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${subscript.id}`} color="link" size="sm">
                        {subscript.id}
                      </Button>
                    </td>
                    <td>{subscript.subscriptCode}</td>
                    <td>
                      <TextFormat type="date" value={subscript.subscriptDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{subscript.customerId}</td>
                    <td>{subscript.customerName}</td>
                    <td>{subscript.unitBuyPriceInd}</td>
                    <td>{subscript.unitBuyPrice}</td>
                    <td>{subscript.unitBuyUnit}</td>
                    <td>{subscript.unitBuyLot}</td>
                    <td>{subscript.unitBuyBasket}</td>
                    <td>{subscript.market}</td>
                    <td>{subscript.buyGrossAmount}</td>
                    <td>{subscript.fee}</td>
                    <td>{subscript.buyNetAmount}</td>
                    <td>{subscript.statusCash}</td>
                    <td>{subscript.statusEtf}</td>
                    <td>{subscript.status}</td>
                    <td>{subscript.channel}</td>
                    <td>
                      {subscript.etfProductId ? (
                        <Link to={`etf-product-my-suffix/${subscript.etfProductId}`}>{subscript.etfProductId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subscript.dealerParticipantId ? (
                        <Link to={`dealer-participant-my-suffix/${subscript.dealerParticipantId}`}>{subscript.dealerParticipantId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subscript.etfExecutionDtlId ? (
                        <Link to={`etf-execution-dtl-my-suffix/${subscript.etfExecutionDtlId}`}>{subscript.etfExecutionDtlId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${subscript.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subscript.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subscript.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.subscript.home.notFound">No Subscripts found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subscript }: IRootState) => ({
  subscriptList: subscript.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptMySuffix);
