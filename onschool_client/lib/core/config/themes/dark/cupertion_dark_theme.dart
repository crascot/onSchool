import 'package:flutter/cupertino.dart';
import 'package:onschool_client/core/config/themes/palette/palette.dart';

class AppDarkTheme {
  static const CupertinoThemeData cupertinoDark = CupertinoThemeData(
    brightness: Brightness.dark,
    primaryColor: AppPalette.green,
    primaryContrastingColor: AppPalette.darkGreen,
    barBackgroundColor: AppPalette.green,
    scaffoldBackgroundColor: AppPalette.black,
    applyThemeToAll: true,
    textTheme: CupertinoTextThemeData(
      textStyle: TextStyle(color: AppPalette.green),
      navTitleTextStyle: TextStyle(
          color: AppPalette.green, fontSize: 20, fontWeight: FontWeight.w600),
      navLargeTitleTextStyle: TextStyle(
          color: AppPalette.red, fontSize: 34, fontWeight: FontWeight.bold),
      navActionTextStyle: TextStyle(color: AppPalette.red, fontSize: 18),
      tabLabelTextStyle: TextStyle(color: AppPalette.red, fontSize: 14),
    ),
  );
}
