import 'package:flutter/material.dart';
import 'package:onschool_client/core/config/themes.dart';
import 'package:onschool_client/features/auth/presentation/pages/login_page.dart';

void main() {
  runApp(const OnSchoolApp());
}

class OnSchoolApp extends StatelessWidget {
  const OnSchoolApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OnSchool',
      theme: AppThemes.lightTheme,
      darkTheme: AppThemes.darkTheme,
      home: const LoginPage(),
    );
  }
}
