import 'package:onschool_client/models/model.dart';
import 'package:onschool_client/models/role/role_model.dart';

class UserBaseModel implements Model {
  final int id;
  final String name;
  final String email;
  final String password;
  final RoleModel role;

  UserBaseModel({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.role,
  });

  factory UserBaseModel.fromJson(Map<String, dynamic> json) {
    return UserBaseModel(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      password: json['password'] as String,
      role: RoleModel.fromJson(json['role'] as Map<String, dynamic>),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'role': role.toJson(),
    };
  }
}
