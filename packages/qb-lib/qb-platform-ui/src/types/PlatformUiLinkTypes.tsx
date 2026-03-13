
import { type PropsWithChildren } from 'react';

export type TestableComponentT = {
  testID?: string;
};

export type PlatformUiLinkPropsT = TestableComponentT & PropsWithChildren<{
  href: string,
  push?: boolean,
  asChild?: boolean,
  addPressable?: boolean,
}>
