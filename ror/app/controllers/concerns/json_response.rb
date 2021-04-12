class JsonResponse
	attr_reader :success, :message, :data, :meta, :errors, :status

	def initialize (options = {})
		@success = options[:success].to_s.empty? ? true : options[:success]
		@message = options[:message] || ''
		@data = options[:data] || {}
		@meta = options[:meta] || {}
		@errors = options[:errors] || ''
		@status = options[:status]
	end

	def as_json(*)
		{
			success: success,
			message: message,
			data: data,
			status: status,
			meta: meta,
			errors: errors
		}
	end
end