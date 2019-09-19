import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './mi-my-suffix.reducer';
import { IMiMySuffix } from 'app/shared/model/mi-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMiMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class MiMySuffix extends React.Component<IMiMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { miList, match } = this.props;
    return (
      <div>
        <h2 id="mi-my-suffix-heading">
          <Translate contentKey="etfTestV1App.mi.home.title">Mis</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="etfTestV1App.mi.home.createLabel">Create a new Mi</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {miList && miList.length > 0 ? (
            <Table responsive aria-describedby="mi-my-suffix-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.mi.miCode">Mi Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="etfTestV1App.mi.miName">Mi Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {miList.map((mi, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${mi.id}`} color="link" size="sm">
                        {mi.id}
                      </Button>
                    </td>
                    <td>{mi.miCode}</td>
                    <td>{mi.miName}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${mi.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${mi.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${mi.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="etfTestV1App.mi.home.notFound">No Mis found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mi }: IRootState) => ({
  miList: mi.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiMySuffix);
