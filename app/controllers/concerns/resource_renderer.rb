module ResourceRenderer
	extend ActiveSupport::Concern

	def render_unprocessable_entity_response (resource, message = "Validation Failed", status = 422, meta = {})

		json_response({
			success: false,
			message: message,
			errors: ValidationErrorSerializer.new(resource).serialize,
			status: status
		}, 422)

	end

	def render_unprocessable_entity(message="", status = 422, data = {})
		json_response({
			success: false,
			errors: message,
			status: status,
			data: data
		}, 422) and return true		
	end

	def render_success_response(resources = {}, message = "", status = 200, meta = {})
		json_response({
			success: true,
			message: message,
			data: resources,
			meta: meta,
			status: status
		}, 200)
	end

	def json_reponse(options = {}, status = 500)
		render json: JsonResponse.new(options)
	end

	def array_serializer
		ActiveModel::Serializer::CollectionSerializer
	end

	def single_serializer(object, serialize, other_options = {})
		serializer.new(object, other_options)		
	end
	
end