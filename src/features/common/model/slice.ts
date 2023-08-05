import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from 'shared/types/store';
import { IStack } from 'shared/types/common';
import { MakeOrder } from '../../home/lib/modals';

const initialState: CommonState = {
  bottomSheet: {
    currentStackId: 0,
    isVisible: false,
    stack: [],
  },
  from: {
    title: '',
  },
  where: {
    title: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    loadSelectedAddress: (state, action) => {
      if (action.payload.type === 'where') {
        state.where = action.payload.address;

        return;
      }
      state.from = action.payload.address;
    },
    showBottomSheet: ({ bottomSheet }, { payload }: PayloadAction<IStack>) => {
      bottomSheet.stack = [...bottomSheet.stack, payload];

      bottomSheet.isVisible = bottomSheet.stack.length >= 1;

      bottomSheet.currentStackId = bottomSheet.stack.length - 1;
    },
    hideBottomSheet: (
      { bottomSheet },
      { payload }: PayloadAction<Partial<'force' | 'static'>>,
    ) => {
      if (payload === 'force') {
        bottomSheet.stack = [];

        bottomSheet.isVisible = false;

        bottomSheet.currentStackId = 0;

        return;
      }

      bottomSheet.stack = bottomSheet.stack.slice(
        0,
        bottomSheet.stack.length - 1,
      );

      bottomSheet.isVisible = bottomSheet.stack.length >= 1;

      bottomSheet.currentStackId =
        bottomSheet.stack.length - 1 < 0 ? 0 : bottomSheet.stack.length - 1;
    },
  },
});
