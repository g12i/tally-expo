import noop from "lodash/noop";
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
    inEditMode: PropTypes.bool,
    onPressItem: PropTypes.func,
    removeCounter: PropTypes.func,
  };

  static defaultProps = {
    counters: [],
    inEditMode: false,
    onPressItem: noop,
    removeCounter: noop,
  };

  _keyExtractor = item => item.id;

  _onPressItem = id => this.props.onPressItem(id);

  render() {
    const { counters, inEditMode } = this.props;
    return (
      <FlatList
        data={counters}
        keyExtractor={this._keyExtractor}
        renderItem={({ item, index }) => (
          <CounterListItem
            {...item}
            index={index}
            inEditMode={inEditMode}
            onPress={this._onPressItem}
          />
        )}
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
