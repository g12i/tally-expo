import { AsyncStorage } from "react-native";

const persist = (persistentActionTypes = []) => store => next => async action => {
  const result = next(action);
  if (!persistentActionTypes.includes(action.type)) {
    return result;
  }
  try {
    await AsyncStorage.setItem("STORE", JSON.stringify(store.getState()));
  } catch (err) {
    console.error(err);
    // @todo - handle
    throw err;
  }
  return result;
};

export default persist;
