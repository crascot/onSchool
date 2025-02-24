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
      title: 'Flutter Demo',
      theme: AppThemes.lightTheme,
      darkTheme: AppThemes.darkTheme,
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _decrementCounter() {
    setState(() {
      _counter--;
    });
  }

  void _resetCounter() {
    setState(() {
      _counter = 0;
    });
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('OnSchool App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const LoginPage()
          ],
        ),
      ),
      persistentFooterButtons: [
        FloatingActionButton(
          onPressed: _decrementCounter,
          tooltip: 'Decrement',
          backgroundColor: Theme.of(context).secondaryHeaderColor,
          child: const Icon(Icons.remove),
        ),
        FloatingActionButton(
          onPressed: _resetCounter,
          tooltip: 'Reset',
          backgroundColor: Theme.of(context).secondaryHeaderColor,
          child: const Icon(Icons.settings_backup_restore_rounded),
        ),
        FloatingActionButton(
          onPressed: _incrementCounter,
          tooltip: 'Increment',
          backgroundColor: Theme.of(context).secondaryHeaderColor,
          child: const Icon(Icons.add),
        ),
      ],
    );
  }
}
