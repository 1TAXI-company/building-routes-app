import { FC } from 'react';
import { BottomSheetProps } from '@gorhom/bottom-sheet';
import {Nullable} from "./global";

    export interface IStack {
        component: Nullable<FC<BottomSheetSystemProps['onClose'] & any>>;
        props: Partial<BottomSheetSystemProps> & any;
        options: Partial<BottomSheetProps>;
    }

    export interface IBottomSheet {
        isVisible: boolean;
        currentStackId: number;
        stack: IStack[];
    }

    interface BottomSheetSystemProps {
        hasAdjustNothing: boolean;
        isBackdropHidden: boolean;
        subPoints: (number | string)[];
        onClose: () => void;
    }
}
