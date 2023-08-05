import { IBottomSheet } from './common';
import { store } from '../../app/store';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
  common: CommonState;
}

export interface CommonState {
  bottomSheet: IBottomSheet;
  where: any;
  from: any;
}
