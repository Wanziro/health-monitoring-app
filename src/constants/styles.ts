import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {
  TextStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {appColors} from './colors';

export const viewFlexSpace: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
};

export const viewFlexCenter: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const commonInput = {
  backgroundColor: appColors.WHITE,
  marginTop: 10,
  borderRadius: 5,
  padding: 10,
  borderWidth: 1,
  borderColor: appColors.BORDER_COLOR,
};

export const commonAdminButtonTextStyles: StyleProp<TextStyle> = {
  color: appColors.WHITE,
  textAlign: 'center',
  fontSize: 18,
};

export const commonAdminButtonContainerStyles: StyleProp<ViewStyle> = {
  backgroundColor: appColors.BLUE,
  padding: 15,
  marginTop: 10,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
