import React from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { TYText, TYSdk } from 'tuya-panel-kit';
import Config from '../../../config';
import Strings from '../../../i18n';
import { Popup } from 'tuya-panel-kit';
import CameraManager from '../../nativeComponents/cameraManager';
import PanelClick from '../../../config/panelClick';
import * as DataBase from '../../../utils/database';
import MD5 from 'react-native-md5';
import Res from '../../../res';

const { cx, cy, isIphoneX, winWidth } = Config;

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;

class PwdContent extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      pwdNum: 0,
      dspStr: '',
      pwdStr: '',
      tmpStr: '',
      showEye: true,
      LogMsg: [],
      pwdData: [],
    };
  }

  componentWillMount(){
    this._setItemValue();
  }
  
  componentDidMount() {
    this._getLogMsg();
  }

  _getLogMsg() {
    DataBase.getItem('LogMsg').then(data => {
      if (data == null) {
        this.setState({
          LogMsg: [],
        });
      } else {
        this.setState({
          LogMsg: data,
        });
      }
    });
  }

  _insertLogMsg(text) {
    let tempArr = this.state.LogMsg;
    text = 'time:' + this._getDay() + ' msg: ' + text;
    tempArr.unshift(text);
    console.log('isnertLogMsg:' + tempArr);
    DataBase.setItem('LogMsg', tempArr).catch(error => {
      console.log('1123123123123123123');
    });
  }

  _getDay() {
    var myDate = new Date();
    return myDate.toLocaleString();
  }

  _goLogPage = () => {
    PanelClick.enterLogPage();
  };

  // 数组随机排序
  _shuffle = arr => {
    return arr.sort(() => Math.random() - 0.5);
  };

  _setItemValue = () => {
    const pwdArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let pwdData = this._shuffle(pwdArr);
    pwdData.splice(9, 0, 'clean');
    pwdData.push('send');

    this.setState({
      pwdData: pwdData,
    });
  };
  
  handlePressItem = parm => {
    if (pwdNum >= 8) {
      return;
    }
    if (parm === 'send') {
      this.handleSubmitPwd();
      return;
    }
    if (parm === 'clean') {
      this.handleDeletePwd();
      return;
    }
    console.log('pwd num onClick: ' + parm);
    const { pwdNum, dspStr, pwdStr, tmpStr } = this.state;
    const num = pwdNum + 1;
    const str = dspStr + '*';
    const pStr = pwdStr + parm;
    console.log('pwdStr: ' + pStr);
    this.setState({
      pwdNum: num,
      dspStr: str,
      pwdStr: pStr,
      tmpStr: str,
    });
  };

  handleDeletePwd = () => {
    console.log('pwd handleDeletePwd');
    this.setState({
      pwdNum: 0,
      dspStr: '',
      pwdStr: '',
      tmpStr: '',
    });
    if (this.state.pwdStr === '0000') {
      console.log('跳转调试面板');
      this._goLogPage();
    }
  };

  handleSubmitPwd = () => {
    const { pwdNum, pwdStr } = this.state;
    if (pwdNum >= 8) {
      return;
    }

    const date = new Date();
    const mon = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const pwd_date = (mon * 30 + day) * 24 + hour;

    const pwd_md5_str = MD5.hex_md5(pwdStr) + MD5.hex_md5(pwd_date + '');
    console.log('pwd pwd_date: ' + pwd_date);
    console.log('pwd String : ' + pwdStr);
    console.log('pwd MD5: ' + pwd_md5_str);
    this._insertLogMsg(pwdStr);
    TYDevice.putDeviceData({ [250]: pwd_md5_str });
    Popup.close();
    TYNative.showLoading({ title: Strings.getLang('ipc_remote_unlock_func') });
  };

  handlePressInPwd = () => {
    console.log('pwd handlePressInPwd');
    const { pwdStr, showEye } = this.state;
    this.setState({
      tmpStr: pwdStr,
      showEye: !showEye,
    });
  };

  handlePressOutPwd = () => {
    console.log('pwd handlePressOutPwd');
    const { dspStr, showEye } = this.state;
    this.setState({
      tmpStr: dspStr,
      showEye: !showEye,
    });
  };

  render() {
    const { pwdNum, tmpStr, showEye, pwdData } = this.state;
    return (
      <View style={styles.pwdContPage}>
        <TouchableOpacity
          style={[styles.pwdBox, { flexDirection: 'row' }]}
          onPressIn={this.handlePressInPwd}
          onPressOut={this.handlePressOutPwd}
        >
          <View style={{ flex: 0.1 }}></View>
          <TYText style={styles.inText}>{tmpStr}</TYText>
          <View style={{ flex: 0.1 }}>
            <Image
              style={styles.eye}
              source={showEye ? Res.pwdLock.eyeClose : Res.pwdLock.eyeOpen}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.main}>
          <View style={styles.rowPage}>
            {pwdData.slice(0, 3).map((item, index) => (
              <TouchableHighlight
                underlayColor="#d8d8d8"
                key={index}
                disabled={pwdNum >= 6}
                style={styles.keyBox}
                onPress={() => {
                  this.handlePressItem(item);
                }}
              >
                <TYText style={styles.pwdText}>{item}</TYText>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.rowPage}>
            {pwdData.slice(3, 6).map((item, index) => (
              <TouchableHighlight
                underlayColor="#d8d8d8"
                key={index}
                disabled={pwdNum >= 6}
                style={styles.keyBox}
                onPress={() => {
                  this.handlePressItem(item);
                }}
              >
                <TYText style={styles.pwdText}>{item}</TYText>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.rowPage}>
            {pwdData.slice(6, 9).map((item, index) => (
              <TouchableHighlight
                underlayColor="#d8d8d8"
                key={index}
                disabled={pwdNum >= 6}
                style={styles.keyBox}
                onPress={() => {
                  this.handlePressItem(item);
                }}
              >
                <TYText style={styles.pwdText}>{item}</TYText>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.rowPage}>
            {pwdData.slice(9).map((item, index) => (
              <TouchableHighlight
                underlayColor="#d8d8d8"
                key={index}
                disabled={
                  (item === 'clean' && pwdNum == 0) ||
                  (item === 'send' && pwdNum == 0) ||
                  (item !== 'clean' && item !== 'send' && pwdNum >= 6)
                }
                style={styles.keyBox}
                onPress={() => {
                  this.handlePressItem(item);
                }}
              >
                <TYText style={styles.pwdText}>
                  {item === 'clean'
                    ? Strings.getLang('ipc_remote_pwd_del')
                    : item === 'send'
                    ? Strings.getLang('ipc_remote_pwd_send')
                    : item}
                </TYText>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pwdContPage: {
    width: '100%',
    height: cx(268),
    flexDirection: 'column',
  },
  pwdBox: {
    flexDirection: 'row',
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  main: {
    flex: 0.85,
    flexDirection: 'column',
  },
  rowPage: {
    width: winWidth,
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: '25%',
  },
  keyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRightColor: '#d8d8d8',
    borderRightWidth: 0.8,
    borderLeftColor: '#d8d8d8',
    borderLeftWidth: 0.8,
    opacity: 0.8,
  },
  inText: {
    textAlign: 'center',
    width: '100%',
    color: '#333',
    fontSize: cx(28),
    fontWeight: '600',
    flex: 0.8,
  },
  pwdText: {
    textAlign: 'center',
    width: '100%',
    color: '#333',
    fontSize: cx(18),
    fontWeight: '600',
    paddingBottom: isIphoneX ? 20 : 0,
  },
  eye: {
    width: 20,
    height: 20,
  },
});

export default PwdContent;
