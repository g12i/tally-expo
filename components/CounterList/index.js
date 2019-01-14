import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeCounter } from "../../reducers/counters";
import CounterListItem from "../CounterListItem";
import { BACKGROUND_COLOR } from "../../theme";

class CounterList extends PureComponent {
  _keyExtractor = item => item.id;

  render() {
    const { counters } = this.props;
    return (
      <FlatList
        data={counters}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => <CounterListItem {...item} />}
        style={{ backgroundColor: BACKGROUND_COLOR }}
      />
    );
  }
}

CounterList.defaultProps = {
  counters: [],
  removeCounter: () => {},
};

CounterList.propTypes = {
  counters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      background: PropTypes.string,
      count: PropTypes.number.isRequired,
    })
  ),
  removeCounter: PropTypes.func,
};

export default connect(
  state => ({
    counters: state.counters.map(counter => ({
      ...counter,
      count: state.transitions
        .filter(({ counterId }) => counterId === counter.id)
        .reduce((acc, transition) => acc + transition.transition, 0),
    })),
  }),
  dispatch => ({
    removeCounter: id => dispatch(removeCounter(id)),
  })
)(CounterList);
