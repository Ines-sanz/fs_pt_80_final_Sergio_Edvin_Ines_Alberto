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
    photo = db.Column(db.String)
    year = db.Column(db.Integer)
    brand = db.Column(db.String)
    platform = db.Column(db.String)
    type = db.Column(db.String)
    state = db.Column(db.Boolean, default=True)
    promoted = db.Column(db.Boolean, default=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    #Relationships
    products_in_order = db.relationship('ProductsInOrder', backref= 'products') 
    favorites = db.relationship('Favorites', backref= 'products')
    reviews = db.relatioship('Reviews', backref= 'products')

#Table Orders
class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    subtotal_amount = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Boolean, default=False)
    status = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String, nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #Relationships
    products_in_order = db.relationship('ProductsInOrder', backref='orders')
    checkout = db.relationship('Checkout', backref='orders')

#Table ProductsInOrder
class ProductsInOrder(db.Model):
    __tablename__ = 'products_in_order'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

#table Checkout
class Checkout(db.Model):
    __tablename__ = 'checkout'
    id = db.Column(db.Integer, primary_key=True)
    payment_method = db.Column(db.String, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

#table Followers
class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    
#table Users
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    userName = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    following = db.Column(db.Array)
    subscription = db.Column(db.boolean, nullable=False)
    role = db.Column(db.String, nullable=False)
    shoppingCart = db.Column(db.Array)

    #Relationships
    followers= db.relationship('Followers', backref='users')
    favorites = db.relationship('Favorites', backref='users')
    reviews = db.relationship('Reviews', backref='users')
    orders = db.relationship('Orders', backref='users')
    products = db.relationship('Products', backref='users')

#table Cathegories
class Cathegories(db.Model):
    __tablename__ = 'cathegories'
    id = db.Column(db.Integer, primary_key=True)
    cathegory = db.Column(db.String, nullable=False)
    
    #Relationships
    products = db.relationship('Products', backref='cathegories')

#table Favorites
class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable= False)

#table Reviews
class Reviews(db.Model):
    __tablename__ = 'rewiews'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable= False)