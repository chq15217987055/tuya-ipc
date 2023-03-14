import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { TYText, TYSdk, Popup, Dialog, Utils } from 'tuya-panel-kit';
import _ from 'lodash';
import Config from '../../../config';
import PanelClick from '../../../config/panelClick';
import Res from '../../../res';
import Strings from '../../../i18n';
// import {
//   CHK_VER,
//   CHK_UPGRADE,
//   CMD_UPGRADE,
//   checkVersionData,
//   reqVersionData,
//   upgradeVersionData,
// } from '../../../config/DP/protocol';
// import escapeJson from '../../../config/DP/escapeJson';

const { cx, smallScreen, middlleScreen, is7Plus } = Config;
const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

class PanelView extends React.Component {
  static propTypes = {
    // productId: PropTypes.string.isRequired,
    // devInfo: PropTypes.object.isRequired,
    isAndriodFullScreenNavMode: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      bell_set: 0,
      motion_set: 0,
      // VersionData: {},
      // update: false,
      // status: 0,
    };
  }

  componentDidMount() {
    TYDevice.putDeviceData({ [236]: 242 }); //bell
    TYDevice.putDeviceData({ [236]: 249 }); //micro

    // let protocol_json_str = this._checkVersionData();
    // TYDevice.putDeviceData({ [252]: protocol_json_str });
    TYEvent.on('getSupportStorage', data => {
      //closeGlobalLoading();接送
    });
    TYEvent.on('deviceDataChange', data => {
      const changedp = data.payload;
      if (changedp.detect_switch !== undefined) {
        console.log(`changedp detect_switch: ${changedp.detect_switch}`);
        let val = 0;
        if (changedp.detect_switch === 'record') {
          val = 1;
        } else {
          val = 0;
        }
        this.setState({
          motion_set: val,
        });
      }
      if (changedp.bell_switch !== undefined) {
        // console.log('changedp bell_switch: ' + changedp['bell_switch']);
        let val = 0;
        if (changedp.bell_switch === 'record') {
          val = 1;
        } else {
          val = 0;
        }
        this.setState({
          bell_set: val,
        });
      }
      // if (changedp['protocol'] !== undefined) {
      //   console.log('changedp protocol: ' + changedp['protocol']);
      //   if (changedp['protocol'] === 'clear') {
      //     console.log(changedp['protocol']);
      //   } else {
      //     let proStr = escapeJson(changedp['protocol']);
      //     let proJson = JSON.parse(proStr);
      //     if (proJson['code'] === -1) {
      //       // 这个弹出层需要修改一下弹出逻辑
      //       Dialog.custom({
      //         title: Strings.getLang('ipc_panel_version_information'),
      //         cancelText: Strings.getLang('cancel_btn'),
      //         confirmText: Strings.getLang('confirm_btn'),
      //         content: (
      //           <View
      //             style={{
      //               height: 100,
      //               flexDirection: 'row',
      //               justifyContent: 'center',
      //               flexWrap: 'wrap',
      //               alignItems: 'center',
      //               alignContent: 'center',
      //             }}
      //           >
      //             <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>
      //               {Strings.getLang('ipc_panel_version_upgrade_failed')}
      //             </Text>
      //           </View>
      //         ),
      //         onConfirm: () => {
      //           Dialog.close();
      //         },
      //         onCancel: () => {
      //           Dialog.close();
      //         },
      //       });
      //     }
      //     if (proJson['sId'] === CHK_VER && proJson['code'] === 0) {
      //       this.setState({
      //         update: proJson['data']['update'],
      //         status: proJson['data']['status'],
      //       });
      //     } else if (proJson['sId'] === CHK_UPGRADE && proJson['code'] === 0) {
      //       console.log('CHK_UPGRADE');
      //       this.setState({
      //         VersionData: proJson['data'],
      //         update: proJson['data']['update'],
      //         status: proJson['data']['status'],
      //       });
      //       this.handleOnChkUpgrade();
      //     } else if (proJson['sId'] === CMD_UPGRADE && proJson['code'] === 0) {
      //       console.log('CMD_UPGRADE');
      //       this.setState({
      //         status: proJson['data']['status'],
      //       });
      //     }
      //   }
      // }
    });
  }
  componentWillUnmount() {
    TYEvent.off('deviceDataChange');
    TYEvent.off('getSupportStorage');
  }
  // handleOnChkUpgrade = () => {
  //   const { VersionData, update, status } = this.state;
  //   console.log('VersionData', VersionData);
  //   if (status) {
  //     Dialog.custom({
  //       title: Strings.getLang('ipc_panel_version_information'),
  //       cancelText: Strings.getLang('cancel_btn'),
  //       confirmText: Strings.getLang('confirm_btn'),
  //       content: (
  //         <View
  //           style={{
  //             height: 100,
  //             flexDirection: 'row',
  //             justifyContent: 'center',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             alignContent: 'center',
  //           }}
  //         >
  //           <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>
  //             {Strings.getLang('ipc_panel_version_upgrade')}
  //           </Text>
  //         </View>
  //       ),
  //       onConfirm: () => {
  //         Dialog.close();
  //       },
  //       onCancel: () => {
  //         Dialog.close();
  //       },
  //     });
  //   } else if (!update) {
  //     Dialog.custom({
  //       title: Strings.getLang('ipc_panel_version_information'),
  //       cancelText: Strings.getLang('cancel_btn'),
  //       confirmText: Strings.getLang('confirm_btn'),
  //       content: (
  //         <View
  //           style={{
  //             height: 100,
  //             flexDirection: 'row',
  //             justifyContent: 'center',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             alignContent: 'center',
  //           }}
  //         >
  //           {VersionData.info.split('-').map((item, index) => (
  //             <Text key={index} style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>
  //               {item}
  //             </Text>
  //           ))}
  //         </View>
  //       ),
  //       onConfirm: () => {
  //         Dialog.close();
  //       },
  //       onCancel: () => {
  //         Dialog.close();
  //       },
  //     });
  //   } else if (update) {
  //     Dialog.custom({
  //       title: Strings.getLang('ipc_panel_version_information'),
  //       cancelText: Strings.getLang('cancel_btn'),
  //       confirmText: Strings.getLang('ipc_panel_version_update'),
  //       content: (
  //         <View
  //           style={{
  //             height: 100,
  //             flexDirection: 'row',
  //             justifyContent: 'center',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             alignContent: 'center',
  //           }}
  //         >
  //           {VersionData.info.split('-').map((item, index) => (
  //             <Text key={index} style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>
  //               {item}
  //             </Text>
  //           ))}
  //         </View>
  //       ),
  //       onConfirm: () => {
  //         this.onClickUpgradeVersion();
  //         Dialog.close();
  //       },
  //       onCancel: () => {
  //         Dialog.close();
  //       },
  //     });
  //   }
  // };

  // _checkVersionData = () => {
  //   console.log('_checkVersionData');
  //   let JsonStr = JSON.stringify(checkVersionData);
  //   console.log(JsonStr);
  //   return JsonStr;
  // };
  // _reqVersionData = () => {
  //   console.log('_reqVersionData');
  //   let JsonStr = JSON.stringify(reqVersionData);
  //   console.log(JsonStr);
  //   return JsonStr;
  // };

  // _UpgradeVersionData = () => {
  //   console.log('_UpgradeVersionData');
  //   let JsonStr = JSON.stringify(upgradeVersionData);
  //   console.log('JsonStr', JsonStr);
  //   return JsonStr;
  // };

  onClickAlbum = () => {
    console.log('onClickAlbum');
    PanelClick.enterGeneralAlbum();
  };

  onClickCloud = () => {
    console.log('onClickCloud');
    PanelClick.enterCloudStorage();
  };

  onDpBellSet = val => {
    Popup.close();
    // console.log(`onDpBellSet: ${val}`);
    this.setState({ bell_set: val });
    let str = 'snap';
    if (val === 0) {
      str = 'snap';
    } else {
      str = 'record';
    }
    TYDevice.putDeviceData({ 242: str }); // bell
  };

  onDpMotionSet = val => {
    Popup.close();
    this.setState({ motion_set: val });
    console.log(`onDpMotionSet: ${val}`);
    let str = 'snap';
    if (val === 0) {
      str = 'snap';
    } else {
      str = 'record';
    }
    TYDevice.putDeviceData({ [249]: str }); //micro
  };

  onClickBell = () => {
    console.log('onClickBell');
    // eslint-disable-next-line camelcase
    const { bell_set } = this.state;
    const BellData = [
      // {
      //   value: 0,
      //   title: Strings.getLang('ipc_panel_set_none'),
      // },
      {
        key: 0,
        value: 0,
        title: Strings.getLang('ipc_panel_set_shot'),
      },
      {
        key: 1,
        value: 1,
        title: Strings.getLang('ipc_panel_set_record'),
      },
    ];
    Popup.list({
      footerType: 'singleConfirm',
      dataSource: BellData,
      value: bell_set,
      title: Strings.getLang('ipc_panel_button_bell'),
      confirmText: Strings.getLang('confirm'),
      onConfirm: value => {
        this.onDpBellSet(value);
      },
    });
  };

  onClickMotion = () => {
    console.log('onClickMotion');
    // eslint-disable-next-line camelcase
    const { motion_set } = this.state;
    const MotionData = [
      // {
      //   value: 0,
      //   title: Strings.getLang('ipc_panel_set_none'),
      // },
      {
        key: 0,
        value: 0,
        title: Strings.getLang('ipc_panel_set_shot'),
      },
      {
        key: 1,
        value: 1,
        title: Strings.getLang('ipc_panel_set_record'),
      },
    ];
    Popup.list({
      footerType: 'singleConfirm',
      dataSource: MotionData,
      value: motion_set,
      title: Strings.getLang('ipc_panel_button_micro'),
      confirmText: Strings.getLang('confirm'),
      onConfirm: value => {
        this.onDpMotionSet(value);
      },
    });
  };
  // onClickreqVersion = () => {
  //   console.log('onClickreqVersion');
  //   let protocol_json_str = this._reqVersionData();
  //   TYDevice.putDeviceData({ [252]: protocol_json_str });
  // };
  // onClickUpgradeVersion = () => {
  //   const { status } = this.state;
  //   console.log('onClickUpgradeVersion');
  //   if (!status) {
  //     let protocol_json_str = this._UpgradeVersionData();
  //     TYDevice.putDeviceData({ [252]: protocol_json_str });
  //   }
  // };

  render() {
    // const { update } = this.state;
    const { isAndriodFullScreenNavMode } = this.props;
    let panelPadding = isAndriodFullScreenNavMode ? 28 : 10;
    if (smallScreen) {
      panelPadding = 4;
    } else if (middlleScreen) {
      if (is7Plus) {
        panelPadding = 24;
      } else {
        panelPadding = 10;
      }
    }
    return (
      <ScrollView
        contentContainerStyle={styles.panelViewPage}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <TouchableWithoutFeedback onPress={this.onClickAlbum}>
          <View style={[styles.itemBox, { paddingVertical: panelPadding }]}>
            <Image source={Res.panelView.photo} style={[styles.panelImg]} />
            <View style={styles.panelTextBox}>
              <TYText style={styles.panelText}>
                {Strings.getLang('ipc_panel_button_generalAlbum')}
              </TYText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onClickCloud}>
          <View style={[styles.itemBox, { paddingVertical: panelPadding }]}>
            <Image source={Res.panelView.cloudstorage} style={[styles.panelImg]} />
            <View style={styles.panelTextBox}>
              <TYText style={styles.panelText}>
                {Strings.getLang('ipc_panel_button_cloudStorage')}
              </TYText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onClickBell}>
          <View style={[styles.itemBox, { paddingVertical: panelPadding }]}>
            <Image source={Res.panelView.doorbell} style={[styles.panelImg]} />
            <View style={styles.panelTextBox}>
              <TYText style={styles.panelText}>{Strings.getLang('ipc_panel_button_bell')}</TYText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={_.debounce(
            () => {
              this.onClickMotion();
            },
            100,
            {
              leading: true,
              trailing: false,
            }
          )}
        >
          <View style={[styles.itemBox, { paddingVertical: panelPadding }]}>
            <Image source={Res.panelView.detect} style={[styles.panelImg]} />
            <View style={styles.panelTextBox}>
              <TYText style={styles.panelText}>{Strings.getLang('ipc_panel_button_micro')}</TYText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback
          onPress={_.debounce(
            () => {
              this.onClickreqVersion();
            },
            100,
            {
              leading: true,
              trailing: false,
            }
          )}
        >
          <View style={[styles.itemBox, { paddingVertical: panelPadding }]}>
            <Image
              source={update ? Res.panelView.updater : Res.panelView.updater}
              style={[styles.panelImg]}
            />
            <View style={styles.panelTextBox}>
              <TYText style={styles.panelText}>{Strings.getLang('ipc_panel_button_version')}</TYText>
            </View>
          </View>
        </TouchableWithoutFeedback> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  panelViewPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemBox: {
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  panelImg: {
    width: cx(40),
    resizeMode: 'contain',
  },
  panelTextBox: {
    marginTop: cx(4),
    width: cx(60),
  },
  panelText: {
    fontSize: cx(12),
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  const { dpState, devInfo } = state;
  const {
    showVideoLoad,
    showPopCommon,
    isAndriodFullScreenNavMode,
    panelItemActiveColor,
    isSupportCloudStorage,
  } = state.ipcCommonState;
  const { productId } = devInfo;
  return {
    devInfo,
    showVideoLoad,
    showPopCommon,
    dpState,
    productId,
    isAndriodFullScreenNavMode,
    panelItemActiveColor,
    isSupportCloudStorage,
  };
};

export default connect(mapStateToProps, null)(PanelView);
