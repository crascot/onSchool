import 'package:flutter/material.dart';
import 'package:onschool_client/core/config/themes.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Вход',
                  style: Theme.of(context)
                      .textTheme
                      .headlineMedium
                      ?.copyWith(color: AppColors.gray),
                ),
                const SizedBox(height: 24),
                const TextField(
                  cursorColor: AppColors.black,
                  decoration: InputDecoration(
                    hintStyle: TextStyle(fontSize: 30),
                    labelText: 'Email',
                    labelStyle: TextStyle(color: AppColors.gray),
                    floatingLabelStyle: TextStyle(color: AppColors.black),
                    focusColor: AppColors.black,
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.black),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12)),
                      borderSide: BorderSide(color: AppColors.black),
                    ),
                    errorBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.red),
                    ),
                    focusedErrorBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.red, width: 2.0),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const TextField(
                  obscureText: true,
                  cursorColor: AppColors.black,
                  decoration: InputDecoration(
                    hintStyle: TextStyle(fontSize: 30),
                    labelText: 'Email',
                    labelStyle: TextStyle(color: AppColors.gray),
                    floatingLabelStyle: TextStyle(color: AppColors.black),
                    focusColor: AppColors.black,
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.black),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12)),
                      borderSide: BorderSide(color: AppColors.black),
                    ),
                    errorBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.red),
                    ),
                    focusedErrorBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.red, width: 2.0),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  style: const ButtonStyle(
                      backgroundColor:
                          WidgetStatePropertyAll(AppColors.darkGreen)),
                  onPressed: () {},
                  child: const Text('Войти'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
