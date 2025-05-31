import 'package:flutter/cupertino.dart';
import 'package:onschool_client/core/config/themes/palette/palette.dart';

class AppLightTheme {
  static const CupertinoThemeData cupertinoLight = CupertinoThemeData(
    brightness: Brightness.light,
    primaryColor: AppPalette.black,
    primaryContrastingColor: AppPalette.darkGreen,
    barBackgroundColor: AppPalette.green,
    scaffoldBackgroundColor: AppPalette.white,
    applyThemeToAll: true,
    textTheme: CupertinoTextThemeData(
      textStyle: TextStyle(color: AppPalette.black),
      navTitleTextStyle: TextStyle(
          color: AppPalette.black, fontSize: 20, fontWeight: FontWeight.w600),
      navLargeTitleTextStyle: TextStyle(
          color: AppPalette.red, fontSize: 34, fontWeight: FontWeight.bold),
      navActionTextStyle: TextStyle(color: AppPalette.red, fontSize: 18),
      tabLabelTextStyle: TextStyle(color: AppPalette.red, fontSize: 14),
    ),
  );
}
