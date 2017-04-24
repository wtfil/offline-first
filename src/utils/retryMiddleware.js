export default store => dispatch => {
  const failedActions = [];
  let timer = null;

  async function retryActions() {
    clearTimeout(timer);
    while (failedActions.length) {
      try {
        await dispatch(failedActions[0]);
        failedActions.splice(0, 1);
      } catch (e) {
        break
      }
    }
    timer = setTimeout(retryActions, 5000);
  }
  retryActions();
  window.addEventListener('online', retryActions);

  return async action => {
    if (typeof action !== 'object' || !action.retry) {
      return dispatch(action);
    }
    const {retry, ...actionClone} = action;
    try {
      await dispatch(actionClone)
    } catch (e) {
      failedActions.push(actionClone);
    }
  }
}
