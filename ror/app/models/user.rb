class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :verification
  has_many :properties
  validates :email, :password, :name, :phone_number, presence: true, on: :create
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates_uniqueness_of :email
  validates_uniqueness_of :phone_number
  validates_format_of :phone_number, with:  /\A(\+?\d{1,3})?\d{10}\z/, message: "- Phone number must be in +XXXXXXXXXXXX format"

  enum role: [:buyer, :seller]
  scope :buyer, -> {where(role: :buyer)}
  scope :seller, -> {where(role: :seller)}

  has_one_attached :avatar

  validate :check_file_type ,if: :avatar_attached

  def check_file_type
  	if avatar.content_type.in?(%w(image/gif image/png image/jpg image/jpeg))
  		return true
  	else
  		errors.add(:avatar, "Must be a GIF/JPG/PNG file")
  	end
  end

  def avatar_attached
  	avatar.attched?
  end

  # has_attached_file :avatar, style: { medium: "300X300", thumb: "50X50" }, default_url: "avatar.png"
  # validates_attachment_content_type :avatar, content_type: ["image/jpeg", "image/gif", "image/png"]

  # devise :omniauthable, omaniauth_providers: [:google_oauth2]
end
