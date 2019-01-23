import { GestureHandler } from "expo";

const { BaseButton, RectButton, BorderlessButton } = GestureHandler;

export const TouchableBase = BaseButton;
export const Touchable = RectButton;
export const TouchableText = BorderlessButton;
