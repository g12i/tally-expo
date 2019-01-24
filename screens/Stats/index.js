import format from "date-fns/format";
import compose from "lodash/fp/compose";
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
import TextButton from "../../components/TextButton";
import { removeCounter, updateCounter } from "../../reducers/counters";
import { BACKGROUND_COLOR, BRAND_PRIMARY } from "../../theme";
import styles from "./styles";

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
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      setParams: PropTypes.func,
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
      getParam: noop,
      navigate: noop,
      setParams: noop,
    },
    transitions: [],
  };

  transformData = compose(
    map(([x, y]) => ({ x, y })),
    toPairs,
    mapValues(values => values.reduce((acc, transition) => acc + transition.transition, 0)),
    groupBy(({ date }) => format(date, "YYYY-MM-DD"))
  );

  render() {
    const chartData = this.transformData(this.props.transitions);
    return (
      <View style={styles.container}>
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
