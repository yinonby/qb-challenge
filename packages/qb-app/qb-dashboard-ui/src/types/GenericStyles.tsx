
import { StyleSheet } from 'react-native';

export const useGenericStyles = () => StyleSheet.create({
  spacing: {
    gap: 8,
  },
  spacingLg: {
    gap: 16,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
    alignItems: "center",
    gap: 8,
  },
  flexRowAlignTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  spacingBottom: {
    marginBottom: 8,
  },
  spacingBottomLg: {
    marginBottom: 16,
  },
  alignTextToTableCell: {
    paddingStart: 16,
  }
});
