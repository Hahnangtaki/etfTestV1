import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './redemption-my-suffix.reducer';
import { IRedemptionMySuffix } from 'app/shared/model/redemption-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRedemptionMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class RedemptionMySuffix extends React.Component<IRedemptionMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { redemptionList, match } = this.props;
    return (
      <div>
        <h2 id="redemption-my-suffix-heading">
          <Translate contentKey="etfTestV1App.redemption.home.title">Redemptions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.redemption.home.createLabel">Create a new Redemption</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {redemptionList && redemptionList.length > 0 ? (
            <Table responsive aria-describedby="redemption-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.redemptionCode">Redemption Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.redemptionDate">Redemption Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.customerId">Customer Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.customerName">Customer Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.unitSellPriceInd">Unit Sell Price Ind</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.unitSellPrice">Unit Sell Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.unitSellUnit">Unit Sell Unit</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.unitSellLot">Unit Sell Lot</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.unitSellBasket">Unit Sell Basket</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.market">Market</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.sellGrossAmount">Sell Gross Amount</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.fee">Fee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.sellNetAmount">Sell Net Amount</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.statusCash">Status Cash</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.statusEtf">Status Etf</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.channel">Channel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.etfProduct">Etf Product</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.dealerParticipant">Dealer Participant</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.redemption.etfExecutionDtl">Etf Execution Dtl</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {redemptionList.map((redemption, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${redemption.id}`} color="link" size="sm">
                        {redemption.id}
                      </Button>
                    </td>
                    <td>{redemption.redemptionCode}</td>
                    <td>
                      <TextFormat type="date" value={redemption.redemptionDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{redemption.customerId}</td>
                    <td>{redemption.customerName}</td>
                    <td>{redemption.unitSellPriceInd}</td>
                    <td>{redemption.unitSellPrice}</td>
                    <td>{redemption.unitSellUnit}</td>
                    <td>{redemption.unitSellLot}</td>
                    <td>{redemption.unitSellBasket}</td>
                    <td>{redemption.market}</td>
                    <td>{redemption.sellGrossAmount}</td>
                    <td>{redemption.fee}</td>
                    <td>{redemption.sellNetAmount}</td>
                    <td>{redemption.statusCash}</td>
                    <td>{redemption.statusEtf}</td>
                    <td>{redemption.status}</td>
                    <td>{redemption.channel}</td>
                    <td>
                      {redemption.etfProductId ? (
                        <Link to={`etf-product-my-suffix/${redemption.etfProductId}`}>{redemption.etfProductId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {redemption.dealerParticipantId ? (
                        <Link to={`dealer-participant-my-suffix/${redemption.dealerParticipantId}`}>{redemption.dealerParticipantId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {redemption.etfExecutionDtlId ? (
                        <Link to={`etf-execution-dtl-my-suffix/${redemption.etfExecutionDtlId}`}>{redemption.etfExecutionDtlId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${redemption.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${redemption.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${redemption.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.redemption.home.notFound">No Redemptions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ redemption }: IRootState) => ({
  redemptionList: redemption.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedemptionMySuffix);
