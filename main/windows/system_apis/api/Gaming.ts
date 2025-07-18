/// Auto-generated by Deno Win32: Windows.Win32.Gaming.Apis

import * as util from "../util.ts";

// Enums
export type GAME_INSTALL_SCOPE = number;
export type GAMESTATS_OPEN_TYPE = number;
export type GAMESTATS_OPEN_RESULT = number;
export type GAMING_DEVICE_VENDOR_ID = number;
export type GAMING_DEVICE_DEVICE_ID = number;
export type KnownGamingPrivileges = number;
export type XBL_IDP_AUTH_TOKEN_STATUS = number;

// Constants
export const ID_GDF_XML_STR = `__GDF_XML`;
export const ID_GDF_THUMBNAIL_STR = `__GDF_THUMBNAIL`;
export const GIS_NOT_INSTALLED = 1;
export const GIS_CURRENT_USER = 2;
export const GIS_ALL_USERS = 3;
export const GAMESTATS_OPEN_OPENORCREATE = 0;
export const GAMESTATS_OPEN_OPENONLY = 1;
export const GAMESTATS_OPEN_CREATED = 0;
export const GAMESTATS_OPEN_OPENED = 1;
export const GAMING_DEVICE_VENDOR_ID_NONE = 0;
export const GAMING_DEVICE_VENDOR_ID_MICROSOFT = `-1024700366`;
export const GAMING_DEVICE_DEVICE_ID_NONE = 0;
export const GAMING_DEVICE_DEVICE_ID_XBOX_ONE = 1988865574;
export const GAMING_DEVICE_DEVICE_ID_XBOX_ONE_S = 712204761;
export const GAMING_DEVICE_DEVICE_ID_XBOX_ONE_X = 1523980231;
export const GAMING_DEVICE_DEVICE_ID_XBOX_ONE_X_DEVKIT = 284675555;
export const XPRIVILEGE_BROADCAST = 190;
export const XPRIVILEGE_VIEW_FRIENDS_LIST = 197;
export const XPRIVILEGE_GAME_DVR = 198;
export const XPRIVILEGE_SHARE_KINECT_CONTENT = 199;
export const XPRIVILEGE_MULTIPLAYER_PARTIES = 203;
export const XPRIVILEGE_COMMUNICATION_VOICE_INGAME = 205;
export const XPRIVILEGE_COMMUNICATION_VOICE_SKYPE = 206;
export const XPRIVILEGE_CLOUD_GAMING_MANAGE_SESSION = 207;
export const XPRIVILEGE_CLOUD_GAMING_JOIN_SESSION = 208;
export const XPRIVILEGE_CLOUD_SAVED_GAMES = 209;
export const XPRIVILEGE_SHARE_CONTENT = 211;
export const XPRIVILEGE_PREMIUM_CONTENT = 214;
export const XPRIVILEGE_SUBSCRIPTION_CONTENT = 219;
export const XPRIVILEGE_SOCIAL_NETWORK_SHARING = 220;
export const XPRIVILEGE_PREMIUM_VIDEO = 224;
export const XPRIVILEGE_VIDEO_COMMUNICATIONS = 235;
export const XPRIVILEGE_PURCHASE_CONTENT = 245;
export const XPRIVILEGE_USER_CREATED_CONTENT = 247;
export const XPRIVILEGE_PROFILE_VIEWING = 249;
export const XPRIVILEGE_COMMUNICATIONS = 252;
export const XPRIVILEGE_MULTIPLAYER_SESSIONS = 254;
export const XPRIVILEGE_ADD_FRIEND = 255;
export const XBL_IDP_AUTH_TOKEN_STATUS_SUCCESS = 0;
export const XBL_IDP_AUTH_TOKEN_STATUS_OFFLINE_SUCCESS = 1;
export const XBL_IDP_AUTH_TOKEN_STATUS_NO_ACCOUNT_SET = 2;
export const XBL_IDP_AUTH_TOKEN_STATUS_LOAD_MSA_ACCOUNT_FAILED = 3;
export const XBL_IDP_AUTH_TOKEN_STATUS_XBOX_VETO = 4;
export const XBL_IDP_AUTH_TOKEN_STATUS_MSA_INTERRUPT = 5;
export const XBL_IDP_AUTH_TOKEN_STATUS_OFFLINE_NO_CONSENT = 6;
export const XBL_IDP_AUTH_TOKEN_STATUS_VIEW_NOT_SET = 7;
export const XBL_IDP_AUTH_TOKEN_STATUS_UNKNOWN = `-1`;

// Structs

/**
 * Windows.Win32.Gaming.GAMING_DEVICE_MODEL_INFORMATION (size: 8)
 */
export interface GAMING_DEVICE_MODEL_INFORMATION {
  /** Windows.Win32.Gaming.GAMING_DEVICE_VENDOR_ID */
  vendorId: GAMING_DEVICE_VENDOR_ID;
  /** Windows.Win32.Gaming.GAMING_DEVICE_DEVICE_ID */
  deviceId: GAMING_DEVICE_DEVICE_ID;
}

export const sizeofGAMING_DEVICE_MODEL_INFORMATION = 8;

export function allocGAMING_DEVICE_MODEL_INFORMATION(data?: Partial<GAMING_DEVICE_MODEL_INFORMATION>): Uint8Array {
  const buf = new Uint8Array(sizeofGAMING_DEVICE_MODEL_INFORMATION);
  const view = new DataView(buf.buffer);
  // 0x00: i32
  if (data?.vendorId !== undefined) view.setInt32(0, Number(data.vendorId), true);
  // 0x04: i32
  if (data?.deviceId !== undefined) view.setInt32(4, Number(data.deviceId), true);
  return buf;
}

export class GAMING_DEVICE_MODEL_INFORMATIONView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: i32
  get vendorId(): number {
    return this.view.getInt32(0, true);
  }

  // 0x04: i32
  get deviceId(): number {
    return this.view.getInt32(4, true);
  }

  // 0x00: i32
  set vendorId(value: number) {
    this.view.setInt32(0, value, true);
  }

  // 0x04: i32
  set deviceId(value: number) {
    this.view.setInt32(4, value, true);
  }
}

export type HRESULT = number;

export type HSTRING = bigint | number;

export type BOOL = number;

// Native Libraries

try {
  var libapi_ms_win_gaming_expandedresources_l1_1_0_dll = Deno.dlopen("api-ms-win-gaming-expandedresources-l1-1-0.dll", {
    HasExpandedResources: {
      parameters: ["pointer"],
      result: "pointer",
      optional: true,
    },
    GetExpandedResourceExclusiveCpuCount: {
      parameters: ["pointer"],
      result: "pointer",
      optional: true,
    },
    ReleaseExclusiveCpuSets: {
      parameters: [],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_deviceinformation_l1_1_0_dll = Deno.dlopen("api-ms-win-gaming-deviceinformation-l1-1-0.dll", {
    GetGamingDeviceModelInformation: {
      parameters: ["pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_tcui_l1_1_0_dll = Deno.dlopen("api-ms-win-gaming-tcui-l1-1-0.dll", {
    ShowGameInviteUI: {
      parameters: ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowPlayerPickerUI: {
      parameters: ["pointer", "pointer", "usize", "pointer", "usize", "usize", "usize", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowProfileCardUI: {
      parameters: ["pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowChangeFriendRelationshipUI: {
      parameters: ["pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowTitleAchievementsUI: {
      parameters: ["u32", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ProcessPendingGameUI: {
      parameters: ["i32"],
      result: "pointer",
      optional: true,
    },
    TryCancelPendingGameUI: {
      parameters: [],
      result: "i32",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_tcui_l1_1_1_dll = Deno.dlopen("api-ms-win-gaming-tcui-l1-1-1.dll", {
    CheckGamingPrivilegeWithUI: {
      parameters: ["u32", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    CheckGamingPrivilegeSilently: {
      parameters: ["u32", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_tcui_l1_1_2_dll = Deno.dlopen("api-ms-win-gaming-tcui-l1-1-2.dll", {
    ShowGameInviteUIForUser: {
      parameters: ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowPlayerPickerUIForUser: {
      parameters: ["pointer", "pointer", "pointer", "usize", "pointer", "usize", "usize", "usize", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowProfileCardUIForUser: {
      parameters: ["pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowChangeFriendRelationshipUIForUser: {
      parameters: ["pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowTitleAchievementsUIForUser: {
      parameters: ["pointer", "u32", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    CheckGamingPrivilegeWithUIForUser: {
      parameters: ["pointer", "u32", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    CheckGamingPrivilegeSilentlyForUser: {
      parameters: ["pointer", "u32", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_tcui_l1_1_3_dll = Deno.dlopen("api-ms-win-gaming-tcui-l1-1-3.dll", {
    ShowGameInviteUIWithContext: {
      parameters: ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowGameInviteUIWithContextForUser: {
      parameters: ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

try {
  var libapi_ms_win_gaming_tcui_l1_1_4_dll = Deno.dlopen("api-ms-win-gaming-tcui-l1-1-4.dll", {
    ShowGameInfoUI: {
      parameters: ["u32", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowGameInfoUIForUser: {
      parameters: ["pointer", "u32", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowFindFriendsUI: {
      parameters: ["pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowFindFriendsUIForUser: {
      parameters: ["pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowCustomizeUserProfileUI: {
      parameters: ["pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowCustomizeUserProfileUIForUser: {
      parameters: ["pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowUserSettingsUI: {
      parameters: ["pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    ShowUserSettingsUIForUser: {
      parameters: ["pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

// Symbols

export function HasExpandedResources(
  hasExpandedResources: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_expandedresources_l1_1_0_dll.HasExpandedResources!(util.toPointer(hasExpandedResources));
}

export function GetExpandedResourceExclusiveCpuCount(
  exclusiveCpuCount: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_expandedresources_l1_1_0_dll.GetExpandedResourceExclusiveCpuCount!(util.toPointer(exclusiveCpuCount));
}

export function ReleaseExclusiveCpuSets(): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_expandedresources_l1_1_0_dll.ReleaseExclusiveCpuSets!();
}

export function GetGamingDeviceModelInformation(
  information: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_deviceinformation_l1_1_0_dll.GetGamingDeviceModelInformation!(util.toPointer(information));
}

export function ShowGameInviteUI(
  serviceConfigurationId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionTemplateName: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  invitationDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ShowGameInviteUI!(util.toPointer(serviceConfigurationId), util.toPointer(sessionTemplateName), util.toPointer(sessionId), util.toPointer(invitationDisplayText), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowPlayerPickerUI(
  promptDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  xuids: Deno.PointerValue | Uint8Array /* ptr */,
  xuidsCount: bigint | number /* usize */,
  preSelectedXuids: Deno.PointerValue | Uint8Array /* ptr */,
  preSelectedXuidsCount: bigint | number /* usize */,
  minSelectionCount: bigint | number /* usize */,
  maxSelectionCount: bigint | number /* usize */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.PlayerPickerUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ShowPlayerPickerUI!(util.toPointer(promptDisplayText), util.toPointer(xuids), xuidsCount, util.toPointer(preSelectedXuids), preSelectedXuidsCount, minSelectionCount, maxSelectionCount, util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowProfileCardUI(
  targetUserXuid: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ShowProfileCardUI!(util.toPointer(targetUserXuid), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowChangeFriendRelationshipUI(
  targetUserXuid: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ShowChangeFriendRelationshipUI!(util.toPointer(targetUserXuid), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowTitleAchievementsUI(
  titleId: number /* u32 */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ShowTitleAchievementsUI!(titleId, util.toPointer(completionRoutine), util.toPointer(context));
}

export function ProcessPendingGameUI(
  waitForCompletion: boolean /* Windows.Win32.Foundation.BOOL */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_0_dll.ProcessPendingGameUI!(util.boolToFfi(waitForCompletion));
}

export function TryCancelPendingGameUI(): boolean /* Windows.Win32.Foundation.BOOL */ {
  return util.boolFromFfi(libapi_ms_win_gaming_tcui_l1_1_0_dll.TryCancelPendingGameUI!());
}

export function CheckGamingPrivilegeWithUI(
  privilegeId: number /* u32 */,
  scope: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  policy: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  friendlyMessage: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_1_dll.CheckGamingPrivilegeWithUI!(privilegeId, util.toPointer(scope), util.toPointer(policy), util.toPointer(friendlyMessage), util.toPointer(completionRoutine), util.toPointer(context));
}

export function CheckGamingPrivilegeSilently(
  privilegeId: number /* u32 */,
  scope: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  policy: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  hasPrivilege: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_1_dll.CheckGamingPrivilegeSilently!(privilegeId, util.toPointer(scope), util.toPointer(policy), util.toPointer(hasPrivilege));
}

export function ShowGameInviteUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  serviceConfigurationId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionTemplateName: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  invitationDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.ShowGameInviteUIForUser!(util.toPointer(user), util.toPointer(serviceConfigurationId), util.toPointer(sessionTemplateName), util.toPointer(sessionId), util.toPointer(invitationDisplayText), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowPlayerPickerUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  promptDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  xuids: Deno.PointerValue | Uint8Array /* ptr */,
  xuidsCount: bigint | number /* usize */,
  preSelectedXuids: Deno.PointerValue | Uint8Array /* ptr */,
  preSelectedXuidsCount: bigint | number /* usize */,
  minSelectionCount: bigint | number /* usize */,
  maxSelectionCount: bigint | number /* usize */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.PlayerPickerUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.ShowPlayerPickerUIForUser!(util.toPointer(user), util.toPointer(promptDisplayText), util.toPointer(xuids), xuidsCount, util.toPointer(preSelectedXuids), preSelectedXuidsCount, minSelectionCount, maxSelectionCount, util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowProfileCardUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  targetUserXuid: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.ShowProfileCardUIForUser!(util.toPointer(user), util.toPointer(targetUserXuid), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowChangeFriendRelationshipUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  targetUserXuid: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.ShowChangeFriendRelationshipUIForUser!(util.toPointer(user), util.toPointer(targetUserXuid), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowTitleAchievementsUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  titleId: number /* u32 */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.ShowTitleAchievementsUIForUser!(util.toPointer(user), titleId, util.toPointer(completionRoutine), util.toPointer(context));
}

export function CheckGamingPrivilegeWithUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  privilegeId: number /* u32 */,
  scope: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  policy: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  friendlyMessage: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.CheckGamingPrivilegeWithUIForUser!(util.toPointer(user), privilegeId, util.toPointer(scope), util.toPointer(policy), util.toPointer(friendlyMessage), util.toPointer(completionRoutine), util.toPointer(context));
}

export function CheckGamingPrivilegeSilentlyForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  privilegeId: number /* u32 */,
  scope: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  policy: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  hasPrivilege: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_2_dll.CheckGamingPrivilegeSilentlyForUser!(util.toPointer(user), privilegeId, util.toPointer(scope), util.toPointer(policy), util.toPointer(hasPrivilege));
}

export function ShowGameInviteUIWithContext(
  serviceConfigurationId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionTemplateName: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  invitationDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  customActivationContext: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_3_dll.ShowGameInviteUIWithContext!(util.toPointer(serviceConfigurationId), util.toPointer(sessionTemplateName), util.toPointer(sessionId), util.toPointer(invitationDisplayText), util.toPointer(customActivationContext), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowGameInviteUIWithContextForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  serviceConfigurationId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionTemplateName: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  sessionId: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  invitationDisplayText: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  customActivationContext: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.HSTRING */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_3_dll.ShowGameInviteUIWithContextForUser!(util.toPointer(user), util.toPointer(serviceConfigurationId), util.toPointer(sessionTemplateName), util.toPointer(sessionId), util.toPointer(invitationDisplayText), util.toPointer(customActivationContext), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowGameInfoUI(
  titleId: number /* u32 */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowGameInfoUI!(titleId, util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowGameInfoUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  titleId: number /* u32 */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowGameInfoUIForUser!(util.toPointer(user), titleId, util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowFindFriendsUI(
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowFindFriendsUI!(util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowFindFriendsUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowFindFriendsUIForUser!(util.toPointer(user), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowCustomizeUserProfileUI(
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowCustomizeUserProfileUI!(util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowCustomizeUserProfileUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowCustomizeUserProfileUIForUser!(util.toPointer(user), util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowUserSettingsUI(
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowUserSettingsUI!(util.toPointer(completionRoutine), util.toPointer(context));
}

export function ShowUserSettingsUIForUser(
  user: Uint8Array | Deno.PointerValue /* Windows.Win32.System.WinRT.IInspectable */,
  completionRoutine: Uint8Array | Deno.PointerValue /* Windows.Win32.Gaming.GameUICompletionRoutine */,
  context: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libapi_ms_win_gaming_tcui_l1_1_4_dll.ShowUserSettingsUIForUser!(util.toPointer(user), util.toPointer(completionRoutine), util.toPointer(context));
}

