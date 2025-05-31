import 'package:flutter/cupertino.dart';
import 'package:onschool_client/core/config/themes/dark/cupertion_dark_theme.dart';
import 'package:onschool_client/features/auth/presentation/pages/login_page.dart';

void main() {
  runApp(const OnSchoolApp());
}

class OnSchoolApp extends StatelessWidget {
  const OnSchoolApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Flutter Demo',
      // theme: AppLightTheme.cupertinoLight,
      theme: AppDarkTheme.cupertinoDark,
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const LoginPage();
  }
}
