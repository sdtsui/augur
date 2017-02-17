import { UPDATE_REPORT_COMMIT_LOCK } from '../../reports/actions/commit-report';

export default function (reportCommitLock = {}, action) {
  switch (action.type) {
    case UPDATE_REPORT_COMMIT_LOCK:
      return { ...reportCommitLock, isLocked: action.isLocked };
    default:
      return reportCommitLock;
  }
}