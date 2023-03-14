import Res from '../res';
import Strings from '../i18n';

export const moreFeatureMenu = {
  allMenu: [
    {
      test: 'tuya_ipc_more_album',
      key: 'generalAlbum',
      imgSource: Res.customFeature.dpGeneralAlbum,
      imgTitle: Strings.getLang('ipc_panel_button_generalAlbum'),
      type: 'basic',
    },    
    {
      test: 'tuya_ipc_more_cloud',
      key: 'cloudStorage',
      imgSource: Res.customFeature.serveCloudStorage,
      imgTitle: Strings.getLang('ipc_panel_button_cloudStorage'),
      type: 'basic',
    },
    {
      test: 'tuya_ipc_more_bell',
      key: 'bell_switch',
      imgSource: Res.customFeature.dpIndicator,
      imgTitle: Strings.getLang('ipc_panel_button_bell'),
      type: 'switch',
    },
    {
      test: 'tuya_ipc_more_micro',
      key: 'micro_switch',
      imgSource: Res.customFeature.dpMotion,
      imgTitle: Strings.getLang('ipc_panel_button_micro'),
      type: 'switch',
    }
  ]
};
