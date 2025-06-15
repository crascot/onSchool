// ignore_for_file: constant_identifier_names

import 'package:onschool_client/models/model.dart';

enum RoleModel implements Model {
  ADMIN(1, "ADMIN", "Administrator with full access"),
  TEACHER(2, "TEACHER", "Teacher with access to manage classes and students"),
  STUDENT(3, "STUDENT", "Student with access to view classes and assignments"),
  PARENT(4, "PARENT", "Parent with access to view child's progress"),
  PRINCIPAL(
      5, "PRINCIPAL", "Principal with access to manage school operations");

  final int id;
  final String name;
  final String description;

  const RoleModel(this.id, this.name, this.description);

  factory RoleModel.fromJson(Map<String, dynamic> json) {
    return RoleModel.values.firstWhere(
      (role) => role.id == json['id'] as int,
      orElse: () => throw Exception('Role not found'),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
    };
  }
}
