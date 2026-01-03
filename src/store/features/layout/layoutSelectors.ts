import { RootState } from '@src/store'

export const selectLayout = (state: RootState) => state.Layout
export const selectLayoutType = (state: RootState) => state.Layout.layoutType
export const selectLayoutWidth = (state: RootState) => state.Layout.layoutWidth
export const selectLayoutMode = (state: RootState) => state.Layout.layoutMode
export const selectLayoutSidebar = (state: RootState) => state.Layout.layoutSidebar
export const selectLayoutSidebarColor = (state: RootState) => state.Layout.layoutSidebarColor
export const selectLayoutDirection = (state: RootState) => state.Layout.layoutDirection
export const selectLayoutDataColor = (state: RootState) => state.Layout.layoutDataColor
export const selectLayoutLanguages = (state: RootState) => state.Layout.layoutLanguages
export const selectLayoutNavigation = (state: RootState) => state.Layout.layoutNavigation
export const selectLayoutDarkModeClass = (state: RootState) => state.Layout.layoutDarkModeClass
export const selectIsSettingModalOpen = (state: RootState) => state.Layout.isSettingModalOpen
