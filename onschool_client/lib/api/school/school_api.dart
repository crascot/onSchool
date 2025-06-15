import 'package:onschool_client/api/api_service.dart';
import 'package:onschool_client/api/endpoints.dart';
import 'package:onschool_client/models/school/school_model.dart';

class SchoolApi extends ApiService {
  Future<SchoolModel> getSchool(int id) async {
    final response = await get('/${ApiEndpoints.school}/$id');

    if (response.statusCode == 200) {
      return SchoolModel.fromJson(response.data);
    } else {
      throw Exception('Failed to load school data');
    }
  }

  Future<List<SchoolModel>> getSchools() async {
    final response = await get('/${ApiEndpoints.school}');

    if (response.statusCode == 200) {
      final List<dynamic> data = response.data;
      return data.map((item) => SchoolModel.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load schools');
    }
  }
}
