from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#class User(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#   email = db.Column(db.String(120), unique=True, nullable=False)
#    password = db.Column(db.String(80), unique=False, nullable=False)
#   is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#    def __repr__(self):
#        return f'<User {self.email}>'
#
#   def serialize(self):
#        return {
#          "id": self.id,
#            "email": self.email,
#         do not serialize the password, its a security breach
#       }

#Table Products    
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    photo = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    brand = db.Column(db.String, nullable=False)
    platform = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    state = db.Column(db.Boolean)
    promoted = db.Column(db.Boolean, default=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=1)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    #Relationships
    products_in_order = db.relationship('ProductsInOrder', backref= 'products') 
    favorites = db.relationship('Favorites', backref= 'products')
    reviews = db.relationship('Reviews', backref= 'products')

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "photo": self.photo,
            "year": self.year,
            "brand": self.brand,
            "platform": self.platform,
            "type": self.type,
            "state": self.state,
            "promoted": self.promoted,
            "price": self.price,
            "stock": self.stock,
            "seller_id": self.seller_id,
            "category_id": self.category_id
        }

#Table Orders
class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    subtotal_amount = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Boolean, default=False)
    status = db.Column(db.String)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String, nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #Relationships
    products_in_order = db.relationship('ProductsInOrder', backref='orders')
    checkout = db.relationship('Checkout', backref='orders')


    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "subtotal_amount": self.subtotal_amount,
            "total_amount": self.total_amount,
            "discount": self.discount,
            "status": self.status,
            "address": self.address,
            "city": self.city,
            "postal_code": self.postal_code,
            "country": self.country,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id
        }

#Table ProductsInOrder
class ProductsInOrder(db.Model):
    __tablename__ = 'products_in_order'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id
        }

#table Checkout
class Checkout(db.Model):
    __tablename__ = 'checkout'
    id = db.Column(db.Integer, primary_key=True)
    payment_method = db.Column(db.String, nullable=False)
    status = db.Column(db.String)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "payment_method": self.payment_method,
            "status": self.status,
            "order_id": self.order_id,
            "user_id": self.user_id
        }

#table Followers
class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "followed_id": self.followed_id
        }

# table Users
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    userName = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)
    description = db.Column(db.String)
    address = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String, nullable=False)
    following = db.Column(db.ARRAY(db.Integer))
    subscription = db.Column(db.Boolean, default=False)
    role = db.Column(db.String)
    shoppingCart = db.Column(db.ARRAY(db.Integer))

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "userName": self.userName,
            "avatar": self.avatar,
            "description": self.description,
            "address": self.address,
            "postal_code": self.postal_code,
            "city": self.city,
            "following": self.following,
            "subscription": self.subscription,
            "role": self.role,
            "shoppingCart": self.shoppingCart
        }

# table Cathegories
class Categories(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category
        }

# table Favorites
class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id
        }

# table Reviews
class Reviews(db.Model):
    __tablename__ = 'rewiews'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "comment": self.comment,
            "user_id": self.user_id,
            "product_id": self.product_id
        }