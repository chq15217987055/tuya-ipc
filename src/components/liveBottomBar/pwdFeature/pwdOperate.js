import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { TYText, TYSdk } from 'tuya-panel-kit';
import CameraManager from '../../nativeComponents/cameraManager';
import Config from '../../../config';
import Strings from '../../../i18n';
import Res from '../../../res';
import { cancelRequestTimeOut, requestTimeout } from '../../../utils';
import { Popup } from 'tuya-panel-kit';
import PwdContent from './pwdContent';
import BatteryImg from './batteryImg';

const { cx, cy, isIphoneX } = Config;
const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;
class PwdOperate extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      lockStaStr: Strings.getLang('ipc_remote_lock_unknown'),
      doorStaStr: Strings.getLang('ipc_remote_door_close'),
      batteryStaStr: Strings.getLang('ipc_remote_battery_08'),
      batterySta: 8, // 8:高  5:中  2:低  1:极低
      doorSta: false,
      lockSta: 0, // 0: 已反锁 1：已开锁 2：锁异常
    };
    this._interval = null;
  }

  componentDidMount() {
    TYDevice.putDeviceData({ [236]: 253 }); //locksta
    TYDevice.putDeviceData({ [236]: 148 }); //doorsta
    TYDevice.putDeviceData({ [236]: 126 }); //battery

    TYEvent.on('deviceDataChange', data => {
      const changedp = data.payload;
      if (changedp['remote_pwd'] !== undefined) {
        this.handleRemotePwd(changedp['remote_pwd']);
      }

      if (changedp['lock_state'] !== undefined) {
        console.log('changedp lock_state: ' + changedp['lock_state']);
        this.handleLockSta(changedp['lock_state']);
      }

      if (changedp['accessory_lock'] !== undefined) {
        // console.log('doorsta');
        this.handleDoorSta(changedp['accessory_lock']);
      }

      if (changedp['battery_report_cap'] !== undefined) {
        this.handleBatterySta(changedp['battery_report_cap']);
      }
    });
  }

  componentWillUnmount() {
    TYEvent.off('deviceDataChange');
  }

  handleRemotePwd(remote_pwd) {
    TYNative.hideLoading();
    let pStr = 'Error Unknown';
    if (remote_pwd === '000') {
      pStr = Strings.getLang('ipc_panel_pwd_pass');
    } else if (remote_pwd === '001') {
      pStr = Strings.getLang('ipc_panel_pwd_no_func');
    } else if (remote_pwd === '002') {
      pStr = Strings.getLang('ipc_panel_pwd_no_pwd');
    } else if (remote_pwd === '003') {
      pStr = Strings.getLang('ipc_panel_pwd_frozen');
    } else if (remote_pwd === '004') {
      pStr = Strings.getLang('ipc_panel_pwd_unfrozen');
    } else if (remote_pwd === '101') {
      pStr = Strings.getLang('ipc_panel_pwd_1t');
    } else if (remote_pwd === '102') {
      pStr = Strings.getLang('ipc_panel_pwd_2t');
    } else if (remote_pwd === '103') {
      pStr = Strings.getLang('ipc_panel_pwd_3t');
    } else if (remote_pwd === '104') {
      pStr = Strings.getLang('ipc_panel_pwd_4t');
    } else if (remote_pwd === '105') {
      pStr = Strings.getLang('ipc_panel_pwd_5t');
    } else {
      return;
    }
    console.log();
    Popup.custom({
      title: (
        <View style={{ height: isIphoneX ? 80 : 60, paddingVertical: 15 }}>
          <TYText type="title" size="normal" align="center">
            {pStr}
          </TYText>
        </View>
      ),
      footer: <View />,
      content: <View />,
    });
  }

  handleLockSta(lock_state) {
    let str = Strings.getLang('ipc_remote_lock_unknown');
    let val = 0;
    switch (lock_state) {
      case '1':
        str = Strings.getLang('ipc_remote_lock_unlocking');
        val = 1;
        break;
      case '2':
        str = Strings.getLang('ipc_remote_lock_unlock_done');
        val = 1;
        break;
      case '3':
        str = Strings.getLang('ipc_remote_lock_unlock_err');
        val = 1;
        break;
      case '4':
        str = Strings.getLang('ipc_remote_lock_locking');
        val = 0;
        break;
      case '5':
        str = Strings.getLang('ipc_remote_lock_lock_done');
        val = 0;
        break;
      case '6':
        str = Strings.getLang('ipc_remote_lock_lock_err');
        val = 0;
        break;
      case '7':
        str = Strings.getLang('ipc_remote_lock_auto_lock_done');
        val = 0;
        break;
      case '100':
        str = Strings.getLang('ipc_remote_lock_unknown_err');
        val = 2;
        break;
      default:
        str = Strings.getLang('ipc_remote_lock_unknown');
        val = 0;
        break;
    }
    this.setState({
      lockSta: val,
      lockStaStr: str,
    });
  }

  handleDoorSta(accessory_lock) {
    let str = Strings.getLang('ipc_remote_door_close');
    let val = false;
    if (accessory_lock === false) {
      str = Strings.getLang('ipc_remote_door_close');
      val = false;
    } else {
      str = Strings.getLang('ipc_remote_door_open');
      val = true;
    }
    this.setState({
      doorStaStr: str,
      doorSta: val,
    });
  }

  handleBatterySta(battery_report_cap) {
    let str = Strings.getLang('ipc_remote_battery_08');
    let val = 8;
    if (battery_report_cap < 5600) {
      str = Strings.getLang('ipc_remote_battery_01');
      val = 1;
    } else if (battery_report_cap >= 5600 && battery_report_cap < 6500) {
      str = Strings.getLang('ipc_remote_battery_02');
      val = 2;
    } else if (battery_report_cap >= 6500 && battery_report_cap < 7500) {
      str = Strings.getLang('ipc_remote_battery_05');
      val = 5;
    } else if (battery_report_cap >= 7500) {
      str = Strings.getLang('ipc_remote_battery_08');
      val = 8;
    }
    this.setState({
      batteryStaStr: str,
      batterySta: val,
    });
  }

  _pwdUnlock = () => {
    console.log('pwd unlock');
    /*requestTimeout();*/
    Popup.custom({
      title: Strings.getLang('ipc_remote_unlock_func'),
      titleTextStyle: { fontSize: cx(18), fontWeight: '600' },
      footer: <View />,
      content: <PwdContent />,
    });
  };

  _renderItem = (img, staStr) => {
    return (
      <View style={styles.staInfoItem}>
        <Image source={img} style={styles.item} resizeMode="contain" />
        <View style={styles.itemInfo}>
          <TYText style={styles.itemInfoText}>{staStr}</TYText>
        </View>
      </View>
    );
  };

  lockStaImgMap = data => {
    let lockImg = [
      'Res.pwdLock.lockStaClose',
      'Res.pwdLock.lockStaActive',
      'Res.pwdLock.lockException',
    ];
    return lockImg[data];
  };

  render() {
    const { lockSta, lockStaStr, doorStaStr, doorSta, batteryStaStr, batterySta } = this.state;
    return (
      <View style={styles.operatePage}>
        <View style={styles.white}></View>
        <View style={styles.staInfo}>
          {this._renderItem(
            lockSta === 0
              ? Res.pwdLock.lockStaClose
              : lockSta === 1
              ? Res.pwdLock.lockStaActive
              : Res.pwdLock.lockException,
            lockStaStr
          )}
          {this._renderItem(doorSta ? Res.pwdLock.doorOpened : Res.pwdLock.doorClosed, doorStaStr)}
          {this._renderItem(
            batterySta !== 8
              ? batterySta !== 5
                ? Res.pwdLock.batteryLowPower
                : Res.pwdLock.batteryMediumPower
              : Res.pwdLock.batteryHighPower,
            batteryStaStr
          )}
        </View>

        <View style={styles.lockStaIcon}>
          <TouchableWithoutFeedback onPress={this._pwdUnlock}>
            <Image source={Res.pwdLock.rmoteDoor} resizeMode="contain" style={styles.lockIcon} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.white}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  operatePage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: cy(10),
  },
  white: {
    flex: 0.15,
  },
  lockStaIcon: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: "center",
  },
  lockIcon: {
    flex: 0.75,
    alignItems: 'center',
  },
  staInfo: {
    flex: 0.4,
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  staInfoItem: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    height: cy(40),
    width: cx(40),
  },
  itemInfo: {
    marginLeft: 10,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  itemInfoTitle: {
    color: 'black',
    fontSize: cx(14),
  },
  itemInfoText: {
    // color: '#7F7F7F',
    color: 'black',
    fontSize: cx(14),
  },
});

export default PwdOperate;
