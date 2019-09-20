import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './etf-execution-my-suffix.reducer';
import { IEtfExecutionMySuffix } from 'app/shared/model/etf-execution-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtfExecutionMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtfExecutionMySuffixUpdateState {
  isNew: boolean;
}

export class EtfExecutionMySuffixUpdate extends React.Component<IEtfExecutionMySuffixUpdateProps, IEtfExecutionMySuffixUpdateState> {
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
      const { etfExecutionEntity } = this.props;
      const entity = {
        ...etfExecutionEntity,
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
    this.props.history.push('/entity/etf-execution-my-suffix');
  };

  render() {
    const { etfExecutionEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="etfTestV1App.etfExecution.home.createOrEditLabel">
              <Translate contentKey="etfTestV1App.etfExecution.home.createOrEditLabel">Create or edit a EtfExecution</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : etfExecutionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="etf-execution-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="etf-execution-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="basketOrderIdLabel" for="etf-execution-my-suffix-basketOrderId">
                    <Translate contentKey="etfTestV1App.etfExecution.basketOrderId">Basket Order Id</Translate>
                  </Label>
                  <AvField
                    id="etf-execution-my-suffix-basketOrderId"
                    type="string"
                    className="form-control"
                    name="basketOrderId"
                    validate={{
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="stockCodeLabel" for="etf-execution-my-suffix-stockCode">
                    <Translate contentKey="etfTestV1App.etfExecution.stockCode">Stock Code</Translate>
                  </Label>
                  <AvField
                    id="etf-execution-my-suffix-stockCode"
                    type="text"
                    name="stockCode"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="qtyLabel" for="etf-execution-my-suffix-qty">
                    <Translate contentKey="etfTestV1App.etfExecution.qty">Qty</Translate>
                  </Label>
                  <AvField id="etf-execution-my-suffix-qty" type="string" className="form-control" name="qty" />
                </AvGroup>
                <AvGroup>
                  <Label id="qtyOddLabel" for="etf-execution-my-suffix-qtyOdd">
                    <Translate contentKey="etfTestV1App.etfExecution.qtyOdd">Qty Odd</Translate>
                  </Label>
                  <AvField id="etf-execution-my-suffix-qtyOdd" type="string" className="form-control" name="qtyOdd" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="etf-execution-my-suffix-price">
                    <Translate contentKey="etfTestV1App.etfExecution.price">Price</Translate>
                  </Label>
                  <AvField id="etf-execution-my-suffix-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="etf-execution-my-suffix-amount">
                    <Translate contentKey="etfTestV1App.etfExecution.amount">Amount</Translate>
                  </Label>
                  <AvField id="etf-execution-my-suffix-amount" type="string" className="form-control" name="amount" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/etf-execution-my-suffix" replace color="info">
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
  etfExecutionEntity: storeState.etfExecution.entity,
  loading: storeState.etfExecution.loading,
  updating: storeState.etfExecution.updating,
  updateSuccess: storeState.etfExecution.updateSuccess
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
)(EtfExecutionMySuffixUpdate);
