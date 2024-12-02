import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    opacityText: '#fff',
    headerView: 'grey',
    logout: 'red',
    productBackground: '#fff',
  },
  dark: {
    text: '#fff',
    background: '#0072c6c4',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    opacityText: '#000',
    headerView: '#151414',
    logout: 'red',
    productBackground: '#000',
  },
};
