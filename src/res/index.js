/* eslint-disable global-require */
/* eslint-disable camelcase */
const Res = {
  publicImage: {
    // 通用公共按键
    backArrow: require('./publicImage/backArrow.png'),
    checkCircle: require('./publicImage/checkCircle.png'),
    basicFullScreen: require('./publicImage/basicFullScreen.png'),
    basicCutScreen: require('./publicImage/basicCutScreen.png'),
    basicOneWayTalk: require('./publicImage/basicOneWayTalk.png'),
    basicTwoWayTalk: require('./publicImage/basicTwoWayTalk.png'),
    basicVideo: require('./publicImage/basicVideo.png'),
    basicFeatureClose: require('./publicImage/basicFeatureClose.png'),
    basicFeatureOpen: require('./publicImage/basicFeatureOpen.png'),
    basicMute: require('./publicImage/basicMute.png'),
    basicNotMute: require('./publicImage/basicNotMute.png'),
    basicPlayerSizeHeight: require('./publicImage/basicPlayerSizeHeight.png'),
    basicPlayerSizeWidth: require('./publicImage/basicPlayerSizeWidth.png'),
    cutScreenIcon: require('./publicImage/cutScreenIcon.png'),
    fullCutScreen: require('./publicImage/fullCutScreen.png'),
    fullOneWayTalk: require('./publicImage/fullOneWayTalk.png'),
    fullTwoWayTalk: require('./publicImage/fullTwoWayTalk.png'),
    fullVideo: require('./publicImage/fullVideo.png'),
    oneWayTalkIcon: require('./publicImage/oneWayTalkIcon.png'),
    listRightArrow: require('./publicImage/listRightArrow.png'),
    prevLoading: require('./publicImage/prevLoading.gif'),
  },
  ptzZoomFull: {
    // 全屏ptz和zoom
    ptzBgcImg: require('./ptzZoomFull/ptzBgcImg.png'),
    ptzClickLeft: require('./ptzZoomFull/ptzClickLeft.png'),
    ptzClickRight: require('./ptzZoomFull/ptzClickRight.png'),
    ptzClickTop: require('./ptzZoomFull/ptzClickTop.png'),
    ptzClickBottom: require('./ptzZoomFull/ptzClickBottom.png'),
    ptzDot: require('./ptzZoomFull/ptzDot.png'),
    zoomAdd: require('./ptzZoomFull/zoomAdd.png'),
    zoomCut: require('./ptzZoomFull/zoomCut.png'),
  },
  ptzZoomNormal: {
    // 非全屏ptz和zoom
    ptzBgImg: require('./ptzZoomNormal/ptzBgImg.png'),
    circleImg: require('./ptzZoomNormal/circleImg.png'),
    circleHoverUp: require('./ptzZoomNormal/circleHoverUp.png'),
    circleHoverRight: require('./ptzZoomNormal/circleHoverRight.png'),
    circleHoverDown: require('./ptzZoomNormal/circleHoverDown.png'),
    circleHoverLeft: require('./ptzZoomNormal/circleHoverLeft.png'),
    ptzDot: require('./ptzZoomNormal/ptzDot.png'),
    zoomAdd: require('./ptzZoomNormal/zoomAdd.png'),
    zoomCut: require('./ptzZoomNormal/zoomCut.png'),
    zoomPtzAdd: require('./ptzZoomNormal/zoomPtzAdd.png'),
    zoomPtzCut: require('./ptzZoomNormal/zoomPtzCut.png'),
    zoomCircleBgImg: require('./ptzZoomNormal/zoomCircleBgImg.png'),
  },
  loadingRes: {
    // loading记载
    loadingAnimImg: require('./loadModal/loadingAnimImg.png'),
    loadAnim: require('./loadModal/loadAnim.png'),
  },
  notify: {
    // 消息
    notifyTitle: require('./notify/notifyTitle.png'),
    noNewsImg: require('./notify/noNewsImg.png'),
    ipcMotion: require('./notify/ipc_motion.png'),
    ipcDoorBell: require('./notify/ipc_doorbell.png'),
    ipcPassby: require('./notify/ipc_passby.png'),
    ipcLinger: require('./notify/ipc_linger.png'),
    ipcLeaveMsg: require('./notify/ipc_leave_msg.png'),
    ipcConnected: require('./notify/ipc_connected.png'),
    ipcUnConnected: require('./notify/ipc_unconnected.png'),
    ipc_refuse: require('./notify/ipc_refuse.png'),
    alarmEventImg: require('./notify/alarmEventImg.png'),
    notifyVideoIcon: require('./notify/notifyVideoIcon.png'),
    notifyAudioIcon: require('./notify/notifyAudioIcon.png'),
  },
  collectPoint: {
    // 收藏点
    collectTitleIcon: require('./collectPoint/collectTitleIcon.png'),
    addCollectBgc: require('./collectPoint/addCollectBgc.png'),
    addCollectDecoration: require('./collectPoint/addCollectDecoration.png'),
    collectInitImg: require('./collectPoint/collectInitImg.png'),
    collectDot: require('./collectPoint/collectDot.png'),
    detailEdit: require('./collectPoint/detailEdit.png'),
    detailDelete: require('./collectPoint/detailDelete.png'),
    detailTimer: require('./collectPoint/detailTimer.png'),
  },
  tabPanel: {
    // tab功能按键
    tabMore: require('./tabPanel/tabMore.png'),
    tabMsg: require('./tabPanel/tabMsg.png'),
    tabHome: require('./tabPanel/tabHome.png'),
  },
  panelView: {
    //   panelView
    cloudstorage: require('./panelView/cloudstorage.png'),
    detect: require('./panelView/detect.png'),
    doorbell: require('./panelView/doorbell.png'),
    photo: require('./panelView/photo.png'),
    updater: require('./panelView/updater.png'),
  },
  customFeature: {
    // 自定义功能模块
    dpIndicator: require('./customFeature/dp_indicator.png'),
    dpSdStatus: require('./customFeature/dp_sdStatus.png'),
    dpPrivate: require('./customFeature/dp_private.png'),
    dpFlip: require('./customFeature/dp_flip.png'),
    serveCloudStorage: require('./customFeature/server_cloudStorage.png'),
    dpGeneralAlbum: require('./customFeature/dp_generalAlbum.png'),
    dpMultScreen: require('./customFeature/dp_multiScreen.png'),
    dpWdr: require('./customFeature/dp_wdr.png'),
    dpNightVision: require('./customFeature/dp_nightVision.png'),
    dpNightVisionAuto: require('./customFeature/dp_nightVision_auto.png'),
    dpShimmer: require('./customFeature/dp_shimmer.png'),
    dpAntiFlicker: require('./customFeature/dp_antiFlicker.png'),
    serveVolume: require('./customFeature/server_volume.png'),
    dpTracking: require('./customFeature/dp_tracking.png'),
    dpMotion: require('./customFeature/dp_motion.png'),
    dpPir: require('./customFeature/dp_pir.png'),
    dpDecibel: require('./customFeature/dp_decibel.png'),
    dpCruise: require('./customFeature/dp_cruise.png'),
    ipcOutLine: require('./customFeature/ipc_outLilne.png'),
    dpTempSetting: require('./customFeature/dp_tempSetting.png'),
    dpHumility: require('./customFeature/dp_hunilitySetting.png'),
    dpFloodLight: require('./customFeature/dp_floodLight.png'),
    dpSiren: require('./customFeature/dp_siren.png'),
    dpLullaby: require('./customFeature/dp_lullaby.png'),
    dpWorkMode: require('./customFeature/dp_workMode.png'),
    dpFeedNum: require('./customFeature/dp_feedNum.png'),
  },
  floodLight: {
    // 灯
    lightSwitchOn: require('./floodLight/light_switch_on.png'),
    lightSwitchOff: require('./floodLight/light_switch_off.png'),
    lightWhiteMode: require('./floodLight/light_white_mode.png'),
    lightColorMode: require('./floodLight/light_color_mode.png'),
    lightTimeSchedule: require('./floodLight/light_time_schedule.png'),
    lightTemp: require('./floodLight/light_temp.png'),
    lightBright: require('./floodLight/light_bright.png'),
    lightColorTrack: require('./floodLight/light_color_track.png'),
    lightColorSaturation: require('./floodLight/light_color_saturation.png'),
    lightColorThumb: require('./floodLight/light_color_thumb.png'),
    lightNormalThumb: require('./floodLight/light_normal_thumb.png'),
  },
  deviceVolum: {
    // 设备音量
    volumSliderTrack: require('./deviceVolumn/device_slider_track.png'),
    volumnMaxIcon: require('./deviceVolumn/volumnMaxIcon.png'),
    volumnMinIcon: require('./deviceVolumn/volumnMinIcon.png'),
  },
  lullaby: {
    // 摇篮曲
    lullabyRandomMode: require('./lullaby/lullaby_random_mode.png'),
    lullabySingleMode: require('./lullaby/lullaby_single_mode.png'),
    lullabyCircleMode: require('./lullaby/lullaby_circle_mode.png'),
    lullabyList: require('./lullaby/lullaby_list.png'),
    lullabyPrev: require('./lullaby/lullaby_prev.png'),
    lullabyNext: require('./lullaby/lullaby_next.png'),
    lullabyNormalVoice: require('./lullaby/lullaby_normal_voice.png'),
    lullabyPlayVoice: require('./lullaby/lullaby_play_voice.png'),
    lullabyPause: require('./lullaby/lullaby_pause.png'),
    lullabyPlay: require('./lullaby/lullaby_play.png'),
  },
  sdCard: {
    sdFormateComplete: require('./sdCard/sdFormateComplete.png'),
  },
  // tab云存储
  tabCloudStorage: {
    tipIcon: require('./tabCloudStorage/tipIcon.png'),
  },

  // 远程密码
  pwdLock: {
    // IconBg: require('./pwdLock/IconBg.png'),
    rmoteDoor: require('./pwdLock/rDoor.png'),
    lockStaActive: require('./pwdLock/unlocked.png'),
    lockStaClose: require('./pwdLock/locked.png'),
    lockException: require('./pwdLock/lockException.png'),
    batteryHighPower: require('./pwdLock/ele_high.png'),
    batteryMediumPower: require('./pwdLock/ele_medium.png'),
    batteryLowPower: require('./pwdLock/ele_low.png'),
    doorClosed: require('./pwdLock/door_closed.png'),
    doorOpened: require('./pwdLock/door_open.png'),
    eyeClose: require('./pwdLock/eye_close.png'),
    eyeOpen: require('./pwdLock/eye_open.png'),
  },
  // 公共统计页面
  statisics: {
    arrow: require('./statisics/arrow.png'),
  },
};

export default Res;
