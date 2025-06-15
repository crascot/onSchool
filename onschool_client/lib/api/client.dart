import 'package:dio/dio.dart';
import 'package:onschool_client/core/config/env.dart';

class ApiClient {
  static final Dio dio = Dio(
    BaseOptions(
      baseUrl: Env.apiBaseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {
        'Content-Type': 'application/json',
      },
    ),
  );

  //Логирование запросов и ответов
  // ..interceptors.add(LogInterceptor(
  //     request: true,
  //     requestHeader: true,
  //     requestBody: true,
  //     responseHeader: true,
  //     responseBody: true,
  //     error: true,
  //     logPrint: print,
  //   ));

  static void setAuthToken(String token) {
    dio.options.headers['Authorization'] = 'Bearer $token';
  }
}
