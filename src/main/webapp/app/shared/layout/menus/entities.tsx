import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/global-parameter-my-suffix">
      <Translate contentKey="global.menu.entities.globalParameterMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/bank-custody-my-suffix">
      <Translate contentKey="global.menu.entities.bankCustodyMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/mi-my-suffix">
      <Translate contentKey="global.menu.entities.miMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/dealer-participant-my-suffix">
      <Translate contentKey="global.menu.entities.dealerParticipantMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-product-my-suffix">
      <Translate contentKey="global.menu.entities.etfProductMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-underlying-my-suffix">
      <Translate contentKey="global.menu.entities.etfUnderlyingMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-underlying-dtl-my-suffix">
      <Translate contentKey="global.menu.entities.etfUnderlyingDtlMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-history-my-suffix">
      <Translate contentKey="global.menu.entities.etfHistoryMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/subscript-my-suffix">
      <Translate contentKey="global.menu.entities.subscriptMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/redemption-my-suffix">
      <Translate contentKey="global.menu.entities.redemptionMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-execution-my-suffix">
      <Translate contentKey="global.menu.entities.etfExecutionMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etf-execution-dtl-my-suffix">
      <Translate contentKey="global.menu.entities.etfExecutionDtlMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/portofolio-my-suffix">
      <Translate contentKey="global.menu.entities.portofolioMySuffix" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
