import { commonSlice } from './slice';

export default commonSlice.reducer;

export const { showBottomSheet, hideBottomSheet, loadSelectedAddress } =
  commonSlice.actions;
