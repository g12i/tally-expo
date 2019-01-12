import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeCounter } from "../../reducers/counters";
import CounterListItem from "../CounterListItem";

class CounterList extends PureComponent {
  render() {
    const { counters } = this.props;
    return (
      <View>
        {counters.map(counter => (
          <CounterListItem key={counter.id} {...counter} />
        ))}
      </View>
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