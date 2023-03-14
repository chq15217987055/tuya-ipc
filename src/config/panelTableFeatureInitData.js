/* eslint-disable import/prefer-default-export */
import Res from '../res';
import Strings from '../i18n';
import Notify from '../components/liveBottomBar/notifyFeature/notify';
import PanelView from '../components/liveBottomBar/customFeature/panelView';
import Pwd from '../components/liveBottomBar/pwdFeature';
// import getDP from '../components/liveBottomBar/settingfeature';


export const liveBottomTabMenuArr = {
  tabArr: [
    {
      test: 'tuya_ipc_more_message',
      key: 'notify',
      imgSource: Res.tabPanel.tabMsg,
      imgTitle: Strings.getLang('tabNotify'),
      component: Notify,
    },
    {
      test: 'tuya_ipc_pwd_unlock',
      key: 'pwd',
      imgSource: Res.tabPanel.tabHome,
      imgTitle: Strings.getLang('ipc_remote_pwd_func'),
      component: Pwd,
    },
    {
      test: 'tuya_ipc_dev_more',
      key: 'feature',
      imgSource: Res.tabPanel.tabMore,
      imgTitle: Strings.getLang('tabFeature'),
      component: PanelView,
    },
    
    // {
    //   test: 'tuya_ipc_dpget',
    //   key: 'dpget',
    //   imgSource: Res.tabPanel.tabFeature,
    //   imgTitle: Strings.getLang('tabFeature'),
    //   component: getDP,
    // },
  ],
  needFilterDp: [
    { dpCode: 'ptz_control', iconKey: 'ptzZoom' },
    { dpCode: 'zoom_control', iconKey: 'ptzZoom' },
    { dpCode: 'memory_point_set', iconKey: 'point' },
    { dpCode: 'feed_num', iconKey: 'feed' },
  ],
  needFilterCloudConfig: [{ configName: 'cloudStorage', iconKey: 'cloudStorage' }],
};
