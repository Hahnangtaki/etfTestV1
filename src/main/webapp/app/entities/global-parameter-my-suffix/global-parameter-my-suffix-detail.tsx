import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './global-parameter-my-suffix.reducer';
import { IGlobalParameterMySuffix } from 'app/shared/model/global-parameter-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGlobalParameterMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GlobalParameterMySuffixDetail extends React.Component<IGlobalParameterMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { globalParameterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.globalParameter.detail.title">GlobalParameter</Translate> [<b>{globalParameterEntity.id}</b>
            ]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="prmId">
                <Translate contentKey="etfTestV1App.globalParameter.prmId">Prm Id</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.prmId}</dd>
            <dt>
              <span id="prmName">
                <Translate contentKey="etfTestV1App.globalParameter.prmName">Prm Name</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.prmName}</dd>
            <dt>
              <span id="prmType">
                <Translate contentKey="etfTestV1App.globalParameter.prmType">Prm Type</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.prmType}</dd>
            <dt>
              <span id="appType">
                <Translate contentKey="etfTestV1App.globalParameter.appType">App Type</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.appType}</dd>
            <dt>
              <span id="intVal">
                <Translate contentKey="etfTestV1App.globalParameter.intVal">Int Val</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.intVal}</dd>
            <dt>
              <span id="floatVal">
                <Translate contentKey="etfTestV1App.globalParameter.floatVal">Float Val</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.floatVal}</dd>
            <dt>
              <span id="strVal">
                <Translate contentKey="etfTestV1App.globalParameter.strVal">Str Val</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.strVal}</dd>
            <dt>
              <span id="dateVal">
                <Translate contentKey="etfTestV1App.globalParameter.dateVal">Date Val</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={globalParameterEntity.dateVal} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="show">
                <Translate contentKey="etfTestV1App.globalParameter.show">Show</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.show ? 'true' : 'false'}</dd>
            <dt>
              <span id="edit">
                <Translate contentKey="etfTestV1App.globalParameter.edit">Edit</Translate>
              </span>
            </dt>
            <dd>{globalParameterEntity.edit ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/global-parameter-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/global-parameter-my-suffix/${globalParameterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ globalParameter }: IRootState) => ({
  globalParameterEntity: globalParameter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalParameterMySuffixDetail);
