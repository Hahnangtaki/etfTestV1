import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './global-parameter-my-suffix.reducer';
import { IGlobalParameterMySuffix } from 'app/shared/model/global-parameter-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class GlobalParameterMySuffix extends React.Component<IGlobalParameterMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { globalParameterList, match } = this.props;
    return (
      <div>
        <h2 id="global-parameter-my-suffix-heading">
          <Translate contentKey="etfTestV1App.globalParameter.home.title">Global Parameters</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.globalParameter.home.createLabel">Create a new Global Parameter</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {globalParameterList && globalParameterList.length > 0 ? (
            <Table responsive aria-describedby="global-parameter-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.prmId">Prm Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.prmName">Prm Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.prmType">Prm Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.appType">App Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.intVal">Int Val</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.floatVal">Float Val</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.strVal">Str Val</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.dateVal">Date Val</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.show">Show</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.globalParameter.edit">Edit</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {globalParameterList.map((globalParameter, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="link" size="sm">
                        {globalParameter.id}
                      </Button>
                    </td>
                    <td>{globalParameter.prmId}</td>
                    <td>{globalParameter.prmName}</td>
                    <td>{globalParameter.prmType}</td>
                    <td>{globalParameter.appType}</td>
                    <td>{globalParameter.intVal}</td>
                    <td>{globalParameter.floatVal}</td>
                    <td>{globalParameter.strVal}</td>
                    <td>
                      <TextFormat type="date" value={globalParameter.dateVal} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{globalParameter.show ? 'true' : 'false'}</td>
                    <td>{globalParameter.edit ? 'true' : 'false'}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${globalParameter.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.globalParameter.home.notFound">No Global Parameters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterList: globalParameter.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameterMySuffix);
