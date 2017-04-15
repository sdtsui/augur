import React, { Component, PropTypes } from 'react';

import AuthLogin from 'modules/auth/components/auth-login';
import AuthSignup from 'modules/auth/components/auth-signup';
import AuthImport from 'modules/auth/components/auth-import';
import AuthLedgerLogin from 'modules/auth/components/auth-ledger-login';
import AirbitzLogoIcon from 'modules/common/components/airbitz-logo-icon';
import LedgerLogoIcon from 'modules/common/components/ledger-logo-icon';

import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import ComponentNav from 'modules/common/components/component-nav';

import { AUTH_SIGNUP, AUTH_LOGIN, AUTH_IMPORT } from 'modules/app/constants/views';

export default class AuthView extends Component {
  static propTypes = {
    authAirbitz: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedNav: AUTH_SIGNUP,
      selectedAuthMethod: null,
      selectedLoginIDMethod: null
    };

    this.updateSelectedNav = this.updateSelectedNav.bind(this);
    this.updateSelectedAuthMethod = this.updateSelectedAuthMethod.bind(this);
    this.updateSelectedLoginIDMethod = this.updateSelectedLoginIDMethod.bind(this);
  }

  componentDidMount() {
    this.props.authAirbitz.airbitzOnLoad.onLoad();
  }

  handleModalClose = () => {
    this.setState({
      isShowingModal: false,
    });
  };

  ledgerStepOne = () => {
    this.setState({
      isShowingModal: true,
      title: 'No Ledger detcted',
      message: 'Please connect a Ledger to continue.'

    });
  };

  updateSelectedNav(selectedNav) {
    this.setState({ selectedNav });
  }

  updateSelectedAuthMethod(selectedAuthMethod) {
    this.setState({ selectedLoginIDMethod: null });

    if (this.state.selectedAuthMethod !== null && this.state.selectedAuthMethod === selectedAuthMethod) {
      this.setState({ selectedAuthMethod: null });
    } else {
      this.setState({ selectedAuthMethod });
    }
  }

  updateSelectedLoginIDMethod(selectedLoginIDMethod) {
    if (this.state.selectedLoginIDMethod !== null && this.state.selectedLoginIDMethod === selectedLoginIDMethod) {
      this.setState({ selectedLoginIDMethod: null });
    } else {
      this.setState({ selectedLoginIDMethod });
    }
  }

  render() {
    const p = this.props;
    const s = this.state;

    return (
      <section id="auth_view">
        <article className="auth-methods">
          <ComponentNav
            fullWidth
            navItems={p.authNavItems}
            selectedNav={s.selectedNav}
            updateSelectedNav={this.updateSelectedNav}
          />
          {s.selectedNav !== AUTH_IMPORT &&
            <div className="default-auth">
              <button
                className="auth-airbitz unstyled"
                onClick={p.authAirbitz.airbitzLoginLink.onClick}
              >
                <div>
                  <AirbitzLogoIcon />
                  <span>
                    {s.selectedNav === AUTH_SIGNUP ? 'Signup' : 'Login'} with Airbitz
                  </span>
                </div>
              </button>
              <h4>or</h4>
            </div>
          }
          {s.selectedNav !== AUTH_IMPORT && s.selectedNav !== AUTH_SIGNUP &&
          <div className="default-auth">
            <button
              className="auth-ledger unstyled"
              onClick={this.ledgerStepOne}
            >
              <div>
                <LedgerLogoIcon />
                <span>
                    Login with Ledger
                </span>
              </div>
              {s.isShowingModal &&
              <ModalContainer onClose={this.handleModalClose}>
                <ModalDialog onClose={this.handleModalClose}>
                  <h1
                    className="ledgerModal"
                  >
                    <AuthLedgerLogin {...p.authLedgerLogin} />
                  </h1>
                </ModalDialog>
              </ModalContainer>
              }
            </button>
            <h4>or</h4>
            </div>
          }
          {s.selectedNav === AUTH_SIGNUP &&
            <AuthSignup {...p.authSignup} />
          }
          {s.selectedNav === AUTH_LOGIN &&
            <AuthLogin {...p.authLogin} />
          }
          {s.selectedNav === AUTH_IMPORT &&
            <AuthImport {...p.authImport} />
          }
        </article>
      </section>
    );
  }
}
