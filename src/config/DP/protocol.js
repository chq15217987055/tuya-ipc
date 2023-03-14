/*
mId：主id
sId：从id
data：数据
exp：拓展备用
code:0表示成功，-1表示失败

update：true 可更新  false已最新
mode:0代码手动升级，1代表自动强制升级
info：描述
status:0空闲，1代表正在升级
 */
const UPDATE_MODE = 0; //接口主id

//接口从id
export const CHK_VER = 0; //检查是否最新版本
export const CHK_UPGRADE = 1; //请求版本信息
export const CMD_UPGRADE = 2; //更新指令

//请求是否最新版本
export const checkVersionData = {
  mId: UPDATE_MODE,
  sId: CHK_VER,
  data: {},
  exp: {},
  code: 0,
};

//请求版本信息
export const reqVersionData = {
  mId: UPDATE_MODE,
  sId: CHK_UPGRADE,
  data: {},
  exp: {},
  code: 0,
};

//下发升级指令
export const upgradeVersionData = {
  mId: UPDATE_MODE,
  sId: CMD_UPGRADE,
  data: {},
  exp: {},
  code: 0,
};
