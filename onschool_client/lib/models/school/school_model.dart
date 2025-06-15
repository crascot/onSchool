import 'package:onschool_client/models/model.dart';

class SchoolModel implements Model {
  final int id;
  final String name;
  final String status;
  final String address;
  final String createdAt;
  final String updatedAt;

  SchoolModel({
    required this.id,
    required this.name,
    required this.status,
    required this.address,
    required this.createdAt,
    required this.updatedAt,
  });

  factory SchoolModel.fromJson(Map<String, dynamic> json) {
    return SchoolModel(
      id: json['schools_id'] as int,
      name: json['name'] as String,
      status: json['status'] as String,
      address: json['address'] as String,
      createdAt: json['created_at'] as String,
      updatedAt: json['updated_at'] as String,
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'schools_id': id,
      'name': name,
      'status': status,
      'address': address,
      'created_at': createdAt,
      'updated_at': updatedAt,
    };
  }
}
