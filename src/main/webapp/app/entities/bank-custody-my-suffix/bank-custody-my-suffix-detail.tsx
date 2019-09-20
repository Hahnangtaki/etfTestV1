import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank-custody-my-suffix.reducer';
import { IBankCustodyMySuffix } from 'app/shared/model/bank-custody-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankCustodyMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BankCustodyMySuffixDetail extends React.Component<IBankCustodyMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bankCustodyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="etfTestV1App.bankCustody.detail.title">BankCustody</Translate> [<b>{bankCustodyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="custodyCode">
                <Translate contentKey="etfTestV1App.bankCustody.custodyCode">Custody Code</Translate>
              </span>
            </dt>
            <dd>{bankCustodyEntity.custodyCode}</dd>
            <dt>
              <span id="custodiName">
                <Translate contentKey="etfTestV1App.bankCustody.custodiName">Custodi Name</Translate>
              </span>
            </dt>
            <dd>{bankCustodyEntity.custodiName}</dd>
          </dl>
          <Button tag={Link} to="/entity/bank-custody-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/bank-custody-my-suffix/${bankCustodyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ bankCustody }: IRootState) => ({
  bankCustodyEntity: bankCustody.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankCustodyMySuffixDetail);
