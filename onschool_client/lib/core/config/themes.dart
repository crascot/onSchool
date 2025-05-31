import 'package:flutter/material.dart';

class AppThemes {
  static ThemeData lightTheme = ThemeData(
    useMaterial3: false,
    brightness: Brightness.light,
    primaryColor: AppColors.white,
    secondaryHeaderColor: AppColors.darkGreen,
    scaffoldBackgroundColor: AppColors.white,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.white,
      elevation: 0,
      iconTheme: IconThemeData(color: AppColors.black),
    ),
    textTheme: AppTextThemes.lightTextTheme,
  );

  static ThemeData darkTheme = ThemeData(
    useMaterial3: false,
    brightness: Brightness.dark,
    primaryColor: AppColors.black,
    secondaryHeaderColor: AppColors.green,
    scaffoldBackgroundColor: AppColors.black,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.darkGreen,
      elevation: 0,
      iconTheme: IconThemeData(color: AppColors.white),
    ),
    textTheme: AppTextThemes.darkTextTheme,
  );
}

class AppColors {
  static const Color black = Color(0xFF100F14);
  static const Color gray = Color(0xFF1b1a1e);
  static const Color lightGray = Color(0xFF39383e);
  static const Color white = Color(0xFFF4F3F3);
  static const Color blue = Color(0xFF3f7aa8);
  static const Color red = Color(0xFF9f575a);
  static const Color green = Color(0xFF86ddb8);
  static const Color darkGreen = Color.fromRGBO(69, 145, 33, 0.6);
}

class AppTextThemes {
  static TextTheme lightTextTheme = const TextTheme(
    displayLarge: TextStyle(
        fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.black),
    titleLarge: TextStyle(
      fontSize: 48,
      color: AppColors.black,
    ),
    bodyLarge: TextStyle(fontSize: 16, color: AppColors.black),
  );

  static TextTheme darkTextTheme = const TextTheme(
    displayLarge: TextStyle(
        fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.white),
    titleLarge: TextStyle(fontSize: 48, color: AppColors.white),
    bodyLarge: TextStyle(fontSize: 16, color: AppColors.white),
  );
}
