import {appColors} from './colors';

export const flexSpace = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
};

export const flexCenter = {
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

export const commonAdminButtonTextStyles = {
  color: appColors.WHITE,
  textAlign: 'center',
  fontSize: 18,
  marginLeft: 10,
};

export const commonAdminButtonContainerStyles = {
  backgroundColor: appColors.BLUE,
  padding: 15,
  marginTop: 10,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
