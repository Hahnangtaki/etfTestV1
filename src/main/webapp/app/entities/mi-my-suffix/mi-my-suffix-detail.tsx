import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mi-my-suffix.reducer';
import { IMiMySuffix } from 'app/shared/model/mi-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMiMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MiMySuffixDetail extends React.Component<IMiMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { miEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.mi.detail.title">Mi</Translate> [<b>{miEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="miCode">
                <Translate contentKey="etfTestV1App.mi.miCode">Mi Code</Translate>
              </span>
            </dt>
            <dd>{miEntity.miCode}</dd>
            <dt>
              <span id="miName">
                <Translate contentKey="etfTestV1App.mi.miName">Mi Name</Translate>
              </span>
            </dt>
            <dd>{miEntity.miName}</dd>
          </dl>
          <Button tag={Link} to="/entity/mi-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/mi-my-suffix/${miEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ mi }: IRootState) => ({
  miEntity: mi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiMySuffixDetail);
