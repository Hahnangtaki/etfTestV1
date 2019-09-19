import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './global-parameter-my-suffix.reducer';
import { IGlobalParameterMySuffix } from 'app/shared/model/global-parameter-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGlobalParameterMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IGlobalParameterMySuffixUpdateState {
  isNew: boolean;
}

export class GlobalParameterMySuffixUpdate extends React.Component<
  IGlobalParameterMySuffixUpdateProps,
  IGlobalParameterMySuffixUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { globalParameterEntity } = this.props;
      const entity = {
        ...globalParameterEntity,
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
    this.props.history.push('/entity/global-parameter-my-suffix');
  };

  render() {
    const { globalParameterEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="etfTestV1App.globalParameter.home.createOrEditLabel">
              <Translate contentKey="etfTestV1App.globalParameter.home.createOrEditLabel">Create or edit a GlobalParameter</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : globalParameterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="global-parameter-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="global-parameter-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="prmIdLabel" for="global-parameter-my-suffix-prmId">
                    <Translate contentKey="etfTestV1App.globalParameter.prmId">Prm Id</Translate>
                  </Label>
                  <AvField
                    id="global-parameter-my-suffix-prmId"
                    type="text"
                    name="prmId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="prmNameLabel" for="global-parameter-my-suffix-prmName">
                    <Translate contentKey="etfTestV1App.globalParameter.prmName">Prm Name</Translate>
                  </Label>
                  <AvField
                    id="global-parameter-my-suffix-prmName"
                    type="text"
                    name="prmName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="prmTypeLabel" for="global-parameter-my-suffix-prmType">
                    <Translate contentKey="etfTestV1App.globalParameter.prmType">Prm Type</Translate>
                  </Label>
                  <AvField
                    id="global-parameter-my-suffix-prmType"
                    type="text"
                    name="prmType"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 1, errorMessage: translate('entity.validation.maxlength', { max: 1 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="appTypeLabel" for="global-parameter-my-suffix-appType">
                    <Translate contentKey="etfTestV1App.globalParameter.appType">App Type</Translate>
                  </Label>
                  <AvField id="global-parameter-my-suffix-appType" type="text" name="appType" />
                </AvGroup>
                <AvGroup>
                  <Label id="intValLabel" for="global-parameter-my-suffix-intVal">
                    <Translate contentKey="etfTestV1App.globalParameter.intVal">Int Val</Translate>
                  </Label>
                  <AvField id="global-parameter-my-suffix-intVal" type="string" className="form-control" name="intVal" />
                </AvGroup>
                <AvGroup>
                  <Label id="floatValLabel" for="global-parameter-my-suffix-floatVal">
                    <Translate contentKey="etfTestV1App.globalParameter.floatVal">Float Val</Translate>
                  </Label>
                  <AvField id="global-parameter-my-suffix-floatVal" type="string" className="form-control" name="floatVal" />
                </AvGroup>
                <AvGroup>
                  <Label id="strValLabel" for="global-parameter-my-suffix-strVal">
                    <Translate contentKey="etfTestV1App.globalParameter.strVal">Str Val</Translate>
                  </Label>
                  <AvField id="global-parameter-my-suffix-strVal" type="text" name="strVal" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateValLabel" for="global-parameter-my-suffix-dateVal">
                    <Translate contentKey="etfTestV1App.globalParameter.dateVal">Date Val</Translate>
                  </Label>
                  <AvField id="global-parameter-my-suffix-dateVal" type="date" className="form-control" name="dateVal" />
                </AvGroup>
                <AvGroup>
                  <Label id="showLabel" check>
                    <AvInput id="global-parameter-my-suffix-show" type="checkbox" className="form-control" name="show" />
                    <Translate contentKey="etfTestV1App.globalParameter.show">Show</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="editLabel" check>
                    <AvInput id="global-parameter-my-suffix-edit" type="checkbox" className="form-control" name="edit" />
                    <Translate contentKey="etfTestV1App.globalParameter.edit">Edit</Translate>
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/global-parameter-my-suffix" replace color="info">
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
  globalParameterEntity: storeState.globalParameter.entity,
  loading: storeState.globalParameter.loading,
  updating: storeState.globalParameter.updating,
  updateSuccess: storeState.globalParameter.updateSuccess
});

const mapDispatchToProps = {
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
)(GlobalParameterMySuffixUpdate);
