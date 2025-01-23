from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


#Table Products    
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    img = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    brand = db.Column(db.String, nullable=False)
    platform = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    category = db.Column(db.Enum('accesorios', 'consolas', 'videojuegos', name='category_enum'), nullable=False)
    state = db.Column(db.Boolean)
    promoted = db.Column(db.Boolean, default=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=1)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    

    #Relationships
    products_in_order = db.relationship('ProductsInOrder', backref= 'products') 
    favorites = db.relationship('Favorites', backref= 'products')
    shoppingCart = db.relationship('ShoppingCart', backref='products')
    reviews = db.relationship('Reviews', backref= 'products')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "img": self.img,
            "year": self.year,
            "brand": self.brand,
            "platform": self.platform,
            "type": self.type,
            "state": self.state,
            "promoted": self.promoted,
            "price": self.price,
            "stock": self.stock,
            "seller_id": self.seller_id,
            "category": self.category
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
    status = db.Column(db.Enum('Pending', 'Paid', 'Sent','Transit','Received', name='status_enum'), nullable=False)
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
    address = db.Column(db.String, nullable=True)
    postalCode = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String, nullable=True)
    following = db.Column(db.ARRAY(db.Integer))
    subscription = db.Column(db.Boolean, default=False)
    role = db.Column(db.String)

    #Relationships
    favorites = db.relationship("Favorites", backref='user', lazy=True)
    shoppingCart = db.relationship("ShoppingCart", backref='user', lazy=True)
    reviews = db.relationship('Reviews', backref='users')
    orders_as_buyer = db.relationship("Orders", foreign_keys=[Orders.buyer_id], backref='buyer', lazy=True)
    orders_as_seller = db.relationship("Orders", foreign_keys=[Orders.seller_id], backref='seller', lazy=True)
    products = db.relationship('Products', backref='users')

    followed_by = db.relationship('Followers', foreign_keys='Followers.followed_id', backref='followed', lazy=True)  # Users following this user
    following_users = db.relationship('Followers', foreign_keys='Followers.follower_id', backref='follower', lazy=True)  # Users this user is following
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "userName": self.userName,
            "avatar": self.avatar,
            "description": self.description,
            "address": self.address,
            "postalCode": self.postalCode,
            "city": self.city,
            "favorites": [fav.serialize() for fav in self.favorites],
            "followed_by": [follower.serialize() for follower in self.followed_by],
            "following_users": [followed.serialize() for followed in self.following_users],
            "subscription": self.subscription,
            "role": self.role,
            "shoppingCart": [produc.serialize() for produc in self.shoppingCart]
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
    
#table Shopping Cart
class ShoppingCart(db.Model):
    __tablename__ = 'shoppingCart'
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
    __tablename__ = 'reviews'
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