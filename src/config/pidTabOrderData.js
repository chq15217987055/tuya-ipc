/* eslint-disable import/prefer-default-export */
import Res from '../res';
import Strings from '../i18n';
import Notify from '../components/liveBottomBar/notifyFeature/notify';
import PanelView from '../components/liveBottomBar/customFeature/panelView';
import Feed from '../components/liveBottomBar/feedFeature';

const tabData = [
  {
    pid: '1',
    data: [
      {
        test: 'tuya_ipc_more_message',
        key: 'notify',
        imgSource: Res.tabPanel.tabNotify,
        imgTitle: Strings.getLang('tabNotify'),
        component: Notify,
      },
      {
        test: 'tuya_ipc_more_feed_pet',
        key: 'feed',
        imgSource: Res.tabPanel.tabFeed,
        imgTitle: Strings.getLang('ipc_remote_pwd_func'),
        component: Feed,
      },   
      {
        test: 'tuya_ipc_dev_more',
        key: 'feature',
        imgSource: Res.tabPanel.tabFeature,
        imgTitle: Strings.getLang('tabFeature'),
        component: PanelView,
      },
    ],
  },
];
export default {
  tabData,
};