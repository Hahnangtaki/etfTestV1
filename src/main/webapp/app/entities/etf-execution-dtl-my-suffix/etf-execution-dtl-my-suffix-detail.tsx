import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etf-execution-dtl-my-suffix.reducer';
import { IEtfExecutionDtlMySuffix } from 'app/shared/model/etf-execution-dtl-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtfExecutionDtlMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtfExecutionDtlMySuffixDetail extends React.Component<IEtfExecutionDtlMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etfExecutionDtlEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.etfExecutionDtl.detail.title">EtfExecutionDtl</Translate> [<b>{etfExecutionDtlEntity.id}</b>
            ]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="transactionType">
                <Translate contentKey="etfTestV1App.etfExecutionDtl.transactionType">Transaction Type</Translate>
              </span>
            </dt>
            <dd>{etfExecutionDtlEntity.transactionType}</dd>
            <dt>
              <Translate contentKey="etfTestV1App.etfExecutionDtl.etfExecution">Etf Execution</Translate>
            </dt>
            <dd>{etfExecutionDtlEntity.etfExecutionId ? etfExecutionDtlEntity.etfExecutionId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/etf-execution-dtl-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etf-execution-dtl-my-suffix/${etfExecutionDtlEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etfExecutionDtl }: IRootState) => ({
  etfExecutionDtlEntity: etfExecutionDtl.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtfExecutionDtlMySuffixDetail);
