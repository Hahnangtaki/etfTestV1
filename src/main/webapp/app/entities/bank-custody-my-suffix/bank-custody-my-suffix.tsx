import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bank-custody-my-suffix.reducer';
import { IBankCustodyMySuffix } from 'app/shared/model/bank-custody-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankCustodyMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class BankCustodyMySuffix extends React.Component<IBankCustodyMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { bankCustodyList, match } = this.props;
    return (
      <div>
        <h2 id="bank-custody-my-suffix-heading">
          <Translate contentKey="etfTestV1App.bankCustody.home.title">Bank Custodies</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.bankCustody.home.createLabel">Create a new Bank Custody</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {bankCustodyList && bankCustodyList.length > 0 ? (
            <Table responsive aria-describedby="bank-custody-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.bankCustody.custodyCode">Custody Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.bankCustody.custodiName">Custodi Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bankCustodyList.map((bankCustody, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${bankCustody.id}`} color="link" size="sm">
                        {bankCustody.id}
                      </Button>
                    </td>
                    <td>{bankCustody.custodyCode}</td>
                    <td>{bankCustody.custodiName}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${bankCustody.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bankCustody.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bankCustody.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.bankCustody.home.notFound">No Bank Custodies found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bankCustody }: IRootState) => ({
  bankCustodyList: bankCustody.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankCustodyMySuffix);
