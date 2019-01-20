import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { removeCounter } from "../../reducers/counters";
import { BACKGROUND_COLOR } from "../../theme";
import CounterListItem from "../CounterListItem";

class CounterList extends PureComponent {
  static propTypes = {
    counters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        background: PropTypes.shape({
          id: PropTypes.string.isRequired,
          uri: PropTypes.string.isRequired,
        }),
        count: PropTypes.number.isRequired,
      })
    ),
    removeCounter: PropTypes.func,
  };

  static defaultProps = {
    counters: [],
    removeCounter: () => {},
  };

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
