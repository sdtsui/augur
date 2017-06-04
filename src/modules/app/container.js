import { connect } from 'react-redux';
import App from 'modules/app/components/app';

import { selectNotificationsAndSeenCount } from 'modules/notifications/selectors/notifications';
import { selectMarketsHeader } from 'modules/markets/selectors/markets-header';
import { selectTags } from 'modules/markets/selectors/tags';
import { selectCoreStats } from 'modules/account/selectors/core-stats';
import { updateIsMobile } from 'modules/app/actions/update-is-mobile';
import { updateHeaderHeight } from 'modules/app/actions/update-header-height';
import { updateFooterHeight } from 'modules/app/actions/update-footer-height';
import links from 'modules/link/selectors/links';

import getValue from 'utils/get-value';

const mapStateToProps = state => ({
  activeView: state.activeView,
  marketsLink: links().marketsLink,
  allMarketsLink: links().allMarketsLink,
  favortiesLink: links().favortiesLink,
  pendingReportsLink: links().pendingReportsLink,
  transactionsLink: links().transactionsLink,
  authLink: links().authLink,
  accountLink: links().accountLink,
  myPositionsLink: links().myPositionsLink,
  topicsLink: links().topicsLink,
  tags: selectTags(state),
  coreStats: selectCoreStats(state),
  logged: getValue(state, 'loginAccount.address'),
  notifications: selectNotificationsAndSeenCount(state),
  marketsInfo: selectMarketsHeader(state),
  numFavorites: selectMarketsHeader(state).numFavorites,
  numPendingReports: selectMarketsHeader(state).numPendingReports,
  isMobile: state.isMobile,
  headerHeight: state.headerHeight,
  footerHeight: state.footerHeight
});

const mapDispatchToProps = dispatch => ({
  updateIsMobile: isMobile => dispatch(updateIsMobile(isMobile)),
  updateHeaderHeight: headerHeight => dispatch(updateHeaderHeight(headerHeight)),
  updateFooterHeight: footerHeight => dispatch(updateFooterHeight(footerHeight))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;