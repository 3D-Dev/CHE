import { SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from '../../constants/ActionTypes'
import { NAV_STYLE, THEME_COLOR, THEME_TYPE } from '../../constants/ThemeSetting'

export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed}
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width}
}

export function setThemeType(themeType) {
  return {type: THEME_TYPE, themeType}
}

export function setThemeColor(themeColor) {
  return {type: THEME_COLOR, themeColor}
}

export function onNavStyleChange(navStyle) {
  return {type: NAV_STYLE, navStyle}
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  }
}
