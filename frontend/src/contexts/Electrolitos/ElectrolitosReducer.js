const ElectrolitosReducer = (globalState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...globalState,
        electrolitos: action.payload
      };
    default:
      return globalState;
  }
};

export default ElectrolitosReducer;