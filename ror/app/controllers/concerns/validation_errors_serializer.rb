class ValidationErrorSerializer
	attr_reader :record

	def initialize record
		@record = record
	end

	def serialize
		record.errors.messages.map do |field, messages|
			messages.map do |detail|
				ValidationErrorSerializer.new(record, field, detail).serialize
			end
		end
	end
end