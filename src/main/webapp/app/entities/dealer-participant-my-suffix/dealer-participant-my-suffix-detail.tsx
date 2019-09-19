import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dealer-participant-my-suffix.reducer';
import { IDealerParticipantMySuffix } from 'app/shared/model/dealer-participant-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDealerParticipantMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DealerParticipantMySuffixDetail extends React.Component<IDealerParticipantMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dealerParticipantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.dealerParticipant.detail.title">DealerParticipant</Translate> [
            <b>{dealerParticipantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dealerCode">
                <Translate contentKey="etfTestV1App.dealerParticipant.dealerCode">Dealer Code</Translate>
              </span>
            </dt>
            <dd>{dealerParticipantEntity.dealerCode}</dd>
            <dt>
              <span id="dealerName">
                <Translate contentKey="etfTestV1App.dealerParticipant.dealerName">Dealer Name</Translate>
              </span>
            </dt>
            <dd>{dealerParticipantEntity.dealerName}</dd>
          </dl>
          <Button tag={Link} to="/entity/dealer-participant-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/dealer-participant-my-suffix/${dealerParticipantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dealerParticipant }: IRootState) => ({
  dealerParticipantEntity: dealerParticipant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerParticipantMySuffixDetail);
