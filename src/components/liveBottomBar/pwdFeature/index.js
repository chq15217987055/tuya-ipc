import React from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PwdOperate from './pwdOperate';
import Config from '../../../config';
const { cx } = Config;

class Pwd extends React.Component {
  static propTypes = {
    panelItemActiveColor: PropTypes.string.isRequired,
    tabContentHeight: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      marginTopValue: 0,
      scrollHeight: 0,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  changeMargin = value => {
    this.setState({
      marginTopValue: value.value,
    });
  };
  _onLayout = e => {
    const { height } = e.nativeEvent.layout;
    this.setState({
      scrollHeight: height,
    });
  };

  render() {
    const { panelItemActiveColor, tabContentHeight } = this.props;
    const { marginTopValue, scrollHeight } = this.state;
    const scrollEnabled = tabContentHeight < scrollHeight;
    return (

        <View
          onLayout={e => this._onLayout(e)}
          style={{ marginTop: scrollEnabled ? 0 : marginTopValue }}
        >
          <PwdOperate/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  feedScrollFeaturePage: {
    paddingHorizontal: cx(12),
    paddingVertical: cx(15),

    justifyContent: 'center',
    alignItems: 'center',
  },
  feedFeatureNormalPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: cx(12),
  },
});

const mapStateToProps = state => {
  const { panelItemActiveColor, tabContentHeight } = state.ipcCommonState;
  return {
    panelItemActiveColor,
    tabContentHeight
  };
};

export default connect(mapStateToProps, null)(Pwd);
