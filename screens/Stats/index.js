import format from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import isSameWeek from "date-fns/is_same_iso_week";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";
import compose from "lodash/fp/compose";
import curry from "lodash/fp/curry";
import filter from "lodash/fp/filter";
import groupBy from "lodash/fp/groupBy";
import map from "lodash/fp/map";
import mapValues from "lodash/fp/mapValues";
import toPairs from "lodash/fp/toPairs";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Margin from "../../components/Margin/index";
import TextButton from "../../components/TextButton";
import { removeCounter, updateCounter } from "../../reducers/counters";
import { BACKGROUND_COLOR, BRAND_PRIMARY } from "../../theme";
import styles from "./styles";

const _isSameDay = curry(isSameDay);
const _isSameWeek = curry(isSameWeek);
const _isSameMonth = curry(isSameMonth);
const _isSameYear = curry(isSameYear);

const AGGREGATE_DAILY = "AGGREGATE_DAILY";
const AGGREGATE_WEEKLY = "AGGREGATE_WEEKLY";
const AGGREGATE_MONTHLY = "AGGREGATE_MONTHLY";
const AGGREGATE_YEARLY = "AGGREGATE_YEARLY";

const getAggregationFilter = (aggregation, now = new Date()) => {
  switch (aggregation) {
    case AGGREGATE_YEARLY:
      return _isSameYear(now);
    case AGGREGATE_MONTHLY:
      return _isSameMonth(now);
    case AGGREGATE_WEEKLY:
      return _isSameWeek(now);
    case AGGREGATE_DAILY:
      return _isSameDay(now);
  }
};

const getAggregationFormat = aggregate => {
  switch (aggregate) {
    case AGGREGATE_YEARLY:
      return "MMM";
    case AGGREGATE_MONTHLY:
      return "DD";
    case AGGREGATE_WEEKLY:
      return "ddd";
    case AGGREGATE_DAILY:
      return "H";
  }
};

class Stats extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Statistics",
      headerLeft: (
        <TextButton
          onPress={() => navigation.goBack()}
          icon="arrow-back"
          title="Back"
          color={BRAND_PRIMARY}
        />
      ),
    };
  };

  static propTypes = {
    counter: PropTypes.shape({
      background: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
      }),
      id: PropTypes.string.isRequired,
      reset: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    transitions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        transition: PropTypes.number.isRequired,
        counterId: PropTypes.string.isRequired,
      })
    ),
  };

  static defaultProps = {
    counter: {},
    navigation: {
      goBack: noop,
    },
    transitions: [],
  };

  state = {
    aggregate: AGGREGATE_WEEKLY,
  };

  transformData = compose(
    map(([x, y]) => ({ x, y })),
    toPairs,
    mapValues(values => values.reduce((acc, transition) => acc + transition.transition, 0)),
    groupBy(({ date }) => format(date, getAggregationFormat(this.state.aggregate))),
    filter(({ date }) => getAggregationFilter(this.state.aggregate, new Date())(date))
  );

  _setAggregate = by => () => this.setState({ aggregate: by });

  render() {
    const chartData = this.transformData(this.props.transitions);
    return (
      <View style={styles.container}>
        <Margin bottom={2}>
          <TextButton title="D" onPress={this._setAggregate(AGGREGATE_DAILY)} />
          <TextButton title="W" onPress={this._setAggregate(AGGREGATE_WEEKLY)} />
          <TextButton title="M" onPress={this._setAggregate(AGGREGATE_MONTHLY)} />
          <TextButton title="Y" onPress={this._setAggregate(AGGREGATE_YEARLY)} />
        </Margin>
        <LineChart
          data={{
            labels: chartData.map(({ x }) => x),
            datasets: [
              {
                data: chartData.map(({ y }) => y),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: BACKGROUND_COLOR,
            backgroundGradientFrom: BACKGROUND_COLOR,
            backgroundGradientTo: BACKGROUND_COLOR,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: () => BRAND_PRIMARY,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
}

export default connect(
  ({ counters, transitions }, { navigation }) => {
    const counterId = navigation.getParam("id", null);
    return {
      counter: counters.find(counter => counter.id === counterId),
      transitions: transitions.filter(transition => transition.counterId === counterId),
    };
  },
  dispatch => bindActionCreators({ removeCounter, updateCounter }, dispatch)
)(Stats);
