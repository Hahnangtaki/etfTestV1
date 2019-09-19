import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEtfProductMySuffix } from 'app/shared/model/etf-product-my-suffix.model';
import { getEntities as getEtfProducts } from 'app/entities/etf-product-my-suffix/etf-product-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dealer-participant-my-suffix.reducer';
import { IDealerParticipantMySuffix } from 'app/shared/model/dealer-participant-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDealerParticipantMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDealerParticipantMySuffixUpdateState {
  isNew: boolean;
  etfProductId: string;
}

export class DealerParticipantMySuffixUpdate extends React.Component<
  IDealerParticipantMySuffixUpdateProps,
  IDealerParticipantMySuffixUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      etfProductId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEtfProducts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { dealerParticipantEntity } = this.props;
      const entity = {
        ...dealerParticipantEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/dealer-participant-my-suffix');
  };

  render() {
    const { dealerParticipantEntity, etfProducts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="etfTestV1App.dealerParticipant.home.createOrEditLabel">
              <Translate contentKey="etfTestV1App.dealerParticipant.home.createOrEditLabel">Create or edit a DealerParticipant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dealerParticipantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="dealer-participant-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dealer-participant-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dealerCodeLabel" for="dealer-participant-my-suffix-dealerCode">
                    <Translate contentKey="etfTestV1App.dealerParticipant.dealerCode">Dealer Code</Translate>
                  </Label>
                  <AvField
                    id="dealer-participant-my-suffix-dealerCode"
                    type="text"
                    name="dealerCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dealerNameLabel" for="dealer-participant-my-suffix-dealerName">
                    <Translate contentKey="etfTestV1App.dealerParticipant.dealerName">Dealer Name</Translate>
                  </Label>
                  <AvField
                    id="dealer-participant-my-suffix-dealerName"
                    type="text"
                    name="dealerName"
                    validate={{
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/dealer-participant-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  etfProducts: storeState.etfProduct.entities,
  dealerParticipantEntity: storeState.dealerParticipant.entity,
  loading: storeState.dealerParticipant.loading,
  updating: storeState.dealerParticipant.updating,
  updateSuccess: storeState.dealerParticipant.updateSuccess
});

const mapDispatchToProps = {
  getEtfProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerParticipantMySuffixUpdate);
