"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Products, Orders, ProductsInOrder, Checkout, Followers, Users, Favorites, Reviews,ShoppingCart
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import stripe
import os
import datetime

api = Blueprint('api', __name__)
stripe.api_key = os.getenv("STRIPE_API_KEY")

# Allow CORS requests to this API
CORS(api)


## ······················································· Cómo USER (profile):

#Funciona!!!
@api.route('/register', methods=['POST'])          
def register():
    try:
        # aqui extraemos info
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        userName = request.json.get('userName', None)
        address = request.json.get('address', None)
        postalCode = request.json.get('postalCode', None)
        city = request.json.get('city', None)


        # aqui chequeamos que toda la info este
        if not email and not password and not userName and not address and not city and not postalCode:
            return jsonify({'msg': 'Missing data'}), 400
        
        # aqui chequeamos si usuario existe
        check_user= Users.query.filter_by(email=email).first()

        # en caso no existe -> creamos usario
        if not check_user:
            new_user = Users(email=email, password=password, userName=userName, address=address, city=city, postalCode=postalCode)  # aqui se creo nuevo usuario
            db.session.add(new_user)                                         # aqui se agrego a la tabla
            db.session.commit()                                                #aqui se almacena cambios en la base de datos
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity=str(check_user.id), expires_delta=expires)
            


            return {"msg": "okey", 'token': access_token, 'user': new_user.serialize()}, 201
        # si existe usuario, devolvemos que ya hay una cuenta con ese correo
        return jsonify({"msg": "User already registered"}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({'error':str(error)}), 400
    
#lo he cambiado y ahora si que va, faltaba comprobar valores
@api.route('/user/<int:user_id>', methods=['PUT'])       
@jwt_required()
def update_user(user_id):
    try:
        # Obtener el usuario autenticado
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg': 'Unauthorized: User not found'}), 401

        # Extraer datos del cuerpo de la solicitud
        userName = request.json.get('userName')
        description = request.json.get('description')
        city = request.json.get('city')
        address = request.json.get('address')
        postalCode = request.json.get('postalCode')
        avatar = request.json.get('avatar')

        # Asegurarse de que al menos un campo está presente
        if not (userName or description or city or avatar or address or postalCode):
            return jsonify({'msg': 'No data provided to update'}), 400

        # Obtener el usuario que se desea actualizar
        user = Users.query.get(user_id)
        if not user:
            return jsonify({'msg': 'User not found'}), 404

        # Actualizar solo los campos proporcionados
        if userName is not None:
            user.userName = userName
        if description is not None:
            user.description = description
        if city is not None:
            user.city = city
        if address is not None:
            user.address = address
        if postalCode is not None:
            user.postalCode = postalCode
        if avatar is not None:
            user.avatar = avatar

        # Guardar los cambios en la base de datos
        db.session.commit()
        return jsonify({'msg': 'User updated successfully'}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400

#funciona!!   
@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()      
def delete_user(user_id):
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401
        #retrieve the user by id
        if user.id != user_id:
            return jsonify({'msg': 'Unauthorized: You can only delete your own account'}), 404
        
        #delete user
        db.session.delete(user)
        db.session.commit()

        return jsonify({'msg': 'User deleted successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    
#funciona!!!
@api.route('/users', methods=['GET'])  #para ver otros user
def get_users():
    try:
        # retrieve all users
        users = Users.query.all()
        users_list = [user.serialize() for user in users]

        return jsonify(users_list), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400




#he hecho este para traer solo un user, funciona!!
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        # Retrieve a single user by ID
        user = Users.query.get(user_id)

        # Check if the user exists
        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify(user.serialize()), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
  

  ##........................................................ COMO USER LOGIN 

#funciona!!
@api.route('/login', methods=['POST'])  
def login():
    try: 
        # aqui extraemos info
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        
        # aqui chequeamos que toda la info este
        if not email or not password:
            return jsonify({'msg': 'Missing data'}), 400
        
        # aqui chequeamos si usuario existe
        check_user= Users.query.filter_by(email=email).first()

        if check_user.password == password:
             expires = datetime.timedelta(days=1)
            
             access_token = create_access_token(identity=str(check_user.id), expires_delta=expires)
             return ({"msg": "ok", "token": access_token, "user":check_user.serialize()}), 201
        return jsonify({"msg": "Contraseña incorrecta"}), 400
    
    except Exception as error:
            db.session.rollback()
            return jsonify({'error': str(error)}), 400

#     @api.route('/protected' , methods=['GET'])
# @jwt_required()
# def protected():
#     id = get_jwt_identity()
#     user = User.query.get(id)
#     if not user:
#         return jsonify({"msg": "something went wrong"})
#     return jsonify({"user": user.serialize()}), 200
    

    ##·······················································  Cómo USER(buy/sell):
# funciona!!!!!
@api.route('/product', methods=['POST']) 
@jwt_required()     
def create_product():
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401
        #extract product details from the request
        name = request.json.get('name', None)
        description = request.json.get('description', None)
        img = request.json.get('img', None)
        year = request.json.get('year', None)
        brand = request.json.get('brand', None)
        platform = request.json.get('platform', None)
        type = request.json.get('type', None)
        category = request.json.get('category', None)
        state = request.json.get('state', None)
        promoted = request.json.get('promoted', None) 
        price = request.json.get('price', None)
        seller_id = id
        

        #validate required fields
        if not name or not description or not img or not year or not brand or not platform or not category or not type or not state or not promoted or not price:
            return jsonify({'msg': 'Please fill all the data'}), 400
        
        #create a new product
        new_product = Products(name=name, description=description, img=img, year=year, brand=brand, platform=platform, category=category, type=type, state=state, promoted=promoted, price=price, seller_id = id)
        db.session.add(new_product)
        db.session.commit()

        return jsonify({'msg': 'Product created successfully', 'product': new_product.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    
#FUNCIONAAAAAAA!!!!!!!!!!!!!
@api.route('/product/<int:product_id>', methods=['PUT'])  
@jwt_required()
def update_product(product_id):
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401
        # extract user_id from the request
        # user_id = request.json.get('user_id', None)

        # find the product by id
        product = Products.query.get(product_id)
        if not product:
            return jsonify({'msg': 'Product not found '}), 404
        print(product.seller_id)

        if product.seller_id != int(id):
            return jsonify({'msg': 'not owned by the user', 'id': id, "seller_id": product.seller_id}), 404
        print(id)
        
        #update product details
        product.name = request.json.get('name', product.name)
        product.description = request.json.get('description', product.description)
        product.img = request.json.get('img', product.img)
        product.year = request.json.get('year', product.year)
        product.brand = request.json.get('brand', product.brand)
        product.platform = request.json.get('platform', product.platform)
        product.type = request.json.get('type', product.type)
        product.state = request.json.get('state', product.state)
        product.price = request.json.get('price', product.price)

        db.session.commit()
        return jsonify({'msg': 'Product updated successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    

@api.route('/product/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401

        #find product id
        product =  Products.query.get(product_id)
        if not product_id or product.seller_id != int(id):
            return jsonify({'msg': 'Product not found'}), 404
        
        #delete product
        db.session.delete(product)
        db.session.commit()
        return jsonify({'msg': 'Product deleted successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400


#funciona!!!
@api.route('/products', methods=['GET'])
def get_products():
    try:
        # bring all products
        products = Products.query.all()
        products_list = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'img': product.img,
                'year': product.year,
                'brand': product.brand,
                'category': product.category,
                'platform': product.platform,
                'type': product.type,
                'state': product.state,
                'promoted': product.promoted,
                'price': product.price,
                'stock': product.stock

            } for product in products
        ]
        return jsonify(products_list), 200
    except Exception as error:
        return jsonify({'error': str(error)})
    
#funciona!!!
@api.route('/product/<int:product_id>', methods=['GET'])  
def get_product(product_id):
    try:
        # bring one product with id
        product = Products.query.get(product_id)

        if not product:
            return jsonify({'error': 'Product not found'}), 404
        product_data = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'img': product.img,
                'year': product.year,
                'brand': product.brand,
                'category': product.category,
                'platform': product.platform,
                'type': product.type,
                'state': product.state,
                'promoted': product.promoted,
                'price': product.price,
                'stock': product.stock

            } 
        ]
        return jsonify(product_data), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    

    ##······················································· Cómo USER favs. 

@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_to_favorites():
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 403
        #extractproduct_id from the request  
        product_id = request.json.get('product_id', None)

        #validate required fields
        if not product_id:
            return jsonify({'msg': 'Product ID are required'}), 400
        
        # check if favorite already exist
        existing_favorite = Favorites.query.filter_by(user_id=id, product_id=product_id).first()
        if existing_favorite:
            db.session.delete(existing_favorite)
            db.session.commit()
            return jsonify({'msg': 'Product deleted'}), 200
        else:
        # add to favorites
            new_favorite = Favorites(user_id=id, product_id=product_id)
            db.session.add(new_favorite)
            db.session.commit()

        updated_favorites = [fav.product_id for fav in user.favorites]
        return jsonify({'msg': 'Added to favorites successfully', 'updatedFavorites': updated_favorites}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    
@api.route('/favorite/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_favorite(product_id):
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401 


        #validate required fields
        if not id:
            return jsonify({'msg': 'User ID is required'}), 400
        
        #find the favorite
        favorite = Favorites.query.filter_by(user_id = id, product_id=product_id).first()
        if not favorite:
            return jsonify({'msg': 'Favorite not found'}), 404
        
        #remove from favorites
        db.session.delete(favorite)
        db.session.commit()

        return jsonify({'msg': 'Removed from favorites successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)

        if not user:
            return jsonify({'msg': 'User not found'}), 404

        favorites = Favorites.query.filter_by(user_id=user_id).all()
        favorite_product_ids = [favorite.product_id for favorite in favorites]

        favorite_products = Products.query.filter(Products.id.in_(favorite_product_ids)).all()
        favorite_products_list = [product.serialize() for product in favorite_products]

        return jsonify({'favorite_products': favorite_products_list}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    



    ##··········································································Cómo USER en CHECKOUT:

@api.route('/checkout', methods=['POST'])
@jwt_required()
def add_to_checkout():
    try:
        
        user_id = get_jwt_identity()
        product_id = request.json.get('product_id', None)

        #validate required fields
        if not user_id or not product_id:
            return jsonify({'msg': 'User ID and Product ID are required'}), 400

        #check if the product is already in checkout
        existing_checkout_item = Checkout.query.filter_by(user_id=user_id, product_id=product_id).first()
        if existing_checkout_item:
            return jsonify({'msg': 'Product already in checkout'}), 400
        
        #add product to the users checkout
        new_checkout_item = Checkout(user_id=user_id, product_id=product_id)
        db.session.add(new_checkout_item)
        db.session.commit()

        return jsonify({'msg': 'Product added to the checkout successfully'}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    

# @api.route('/checkout/<int:product_id>', methods=['DELETE'])
# def remove_from_checkout(product_id):
#     try:
#         #Extract user_id from the request
#         user_id = request.json.get('user_id', None)

#         #validate required fields
#         if not user_id:
#             return jsonify({'msg': 'User ID is required'}), 400
    
#         #find the checkout item by user_id and product_id
#         checkout_item = Checkout.query.filter_by(user_id=user_id, product_id=product_id).first()
#         if not checkout_item:
#             return jsonify({'msg': 'Product not found in checkout'}), 404
        
#         #remove from chechout 
#         db.session.delete(checkout_item)
#         db.session.commit()

#         return jsonify({'msg':'Product removed from the checkout succesfully'}), 200
#     except Exception as error:
#         return jsonify({'error': str(error)}), 400


    

# @api.route('/checkout', methods=['GET'])
# def get_checkout():
#     try:
#         # Extract user_id from the request
#         user_id = request.args.get('user_id', None)

#         #validate required fields
#         if not user_id:
#             return jsonify({'msg': 'user ID is required'}), 400
        
#         #retrieve all checkout items for the user
#         checkout_items = Checkout.query.filter_by(user_id=user_id).all()
#         checkout_list = [{'id': item.id, 'product_id': item.product_id} for item in checkout_items]

#         return jsonify({'checkout': checkout_list}), 200
#     except Exception as error:
#         return jsonify({'error': str(error)}),400
 
# uSer to User followed

@api.route('/users/following', methods=['GET'])
@jwt_required()
def get_following():
    try:
        id = get_jwt_identity()
        following = Followers.query.filter_by(follower_id=id).all()
        
        return jsonify([f.serialize() for f in following]), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400

@api.route('/users/follow', methods=['POST'])
@jwt_required()
def follow_user():
    try:
        id = get_jwt_identity()
        followed_id = request.json.get('followed_id', None)

        if not followed_id:
            return jsonify({'error':'Followed ID is required'}), 400

        new_follower = Followers(follower_id= id, followed_id=followed_id)
        db.session.add(new_follower)
        db.session.commit()

        return jsonify({'msg':'User followed successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
        
@api.route('/users/unfollow/<int:followed_id>', methods=['DELETE'])
@jwt_required()
def unfollow_user(followed_id):
    try:
        id = get_jwt_identity()
        follow = Followers.query.filter_by(follower_id=id, followed_id=followed_id).first()

        if not follow:
            return jsonify({'error': 'Follow relationship not found'}), 404

        db.session.delete(follow)
        db.session.commit()
        return jsonify({'msg': 'Unfollowed user successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400

# User to Review

#todas las review sin jwt para que se carguen en la home 
@api.route('/reviews', methods=['GET'])
def get_all_reviews():
    try:
        reviews = Reviews.query.all()  
        return jsonify([r.serialize() for r in reviews]), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400

#reviews del usuario, quiza no sea necesario
@api.route('/users/reviews', methods=['GET'])
@jwt_required()
def get_reviews():
    try:
        id = get_jwt_identity()
        reviews = Reviews.query.filter_by(user_id=id).all()
     
        return jsonify([r.serialize() for r in reviews]), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400


@api.route('/users/reviews', methods=['POST'])
@jwt_required()
def add_review():
    try:
        id = get_jwt_identity()
        product_id = request.get.json('product_id')
        rating = request.get.json('rating')
        comment = request.get.json('comment')

        if not product_id or not rating or not comment:
            return jsonify({'error': 'product_id, rating, and comment are required'}), 400
        
        if not (1 <= rating <= 5):
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400

        new_review = Reviews(user_id=id, product_id=product_id, rating=rating, comment=comment)
        db.session.add(new_review)
        db.session.commit()
        return jsonify({'msg': 'Review added successfully'}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400


@api.route('/users/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try:
        id = get_jwt_identity()
        review = Reviews.query.filter_by(id=review_id, user_id=id).first()

        if not review:
            return jsonify({'error': 'Review not found'}), 404

        db.session.delete(review)
        db.session.commit()
        return jsonify({'msg': 'Review deleted successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400


    ##nuevo STRIPE! pago para productos y suscripcion

def getPrice(ids):
    total = 0
    #buscar los ids de los productos
    #sumar los precios para generar un total
    #devolver ese total
    return total

@api.route('/create-payment', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg': 'Unauthorized: User not found'}), 401
        data = request.json
        if data["products"]:
            #PODEMOS PASAR TODOS LOS ELEMENTOS QUE PERMITA EL OBJETO DE PAYMENTINTENT.CREATE 
            intent = stripe.PaymentIntent.create(
                #amount=getPrice(data['products']), # se deberia de calcular el precio en el back, no recibirse del front
                currency=data['currency'],
                automatic_payment_methods={
                    'enabled': True
                }
            )
            return jsonify({
                'clientSecret': intent['client_secret']
            })
        if data["suscripcion"]:
            intent = stripe.PaymentIntent.create(
                amount= 9.99,
                currency="eur",
                automatic_payment_methods={
                    'enabled': True
                }
            )
            return jsonify({
                'clientSecret': intent['client_secret']
            })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
    
#     ## pago de subscricpion con stripe

# @api.route('/suscripcion-payment', methods=['POST'])
# def suscripcion():
#     try:
#         data = request.json
#         #PODEMOS PASAR TODOS LOS ELEMENTOS QUE PERMITA EL OBJETO DE PAYMENTINTENT.CREATE 
#         intent = stripe.PaymentIntent.create(
#             #amount=getPrice(data['products']), # se deberia de calcular el precio en el back, no recibirse del front
#             amount= 9.99, 
#             currency=data['eur'],
#             automatic_payment_methods={
#                 'enabled': True
#             }
#         )
#         return jsonify({
#             'clientSecret': intent['client_secret']
#         })
#     except Exception as e:
#         return jsonify({'success': False, 'error': str(e)})


#products = (urls)

# @api.route('/products', methods=['GET'])
# def get_products():
#     try:
#         return jsonify(products), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


#Shopping Cart
@api.route('/shopping-cart', methods=['GET'])
@jwt_required()
def get_shopping_cart():
    try:
        user_id = get_jwt_identity()
        user = Users.query.get(user_id)

        if not user:
            return jsonify({'msg': 'User not found'}), 404

        shopping_cart_items = ShoppingCart.query.filter_by(user_id=user_id).all()
        shopping_cart_product_ids = [item.product_id for item in shopping_cart_items]

        shopping_cart_products = Products.query.filter(Products.id.in_(shopping_cart_product_ids)).all()
        shopping_cart_products_list = [product.serialize() for product in shopping_cart_products]

        return jsonify({'shopping_cart_products': shopping_cart_products_list}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500
    
@api.route('/shopping_cart', methods=['POST'])
@jwt_required()
def add_to_shopping_cart():
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 403
        
        # Extraer product_id 
        product_id = request.json.get('product_id', None)
        if not product_id:
            return jsonify({'msg': 'Product ID is required'}), 400
        
        # Verificar si el producto ya está en el carrito
        existing_item = ShoppingCart.query.filter_by(user_id=id, product_id=product_id).first()
        if existing_item:
            db.session.delete(existing_item)
            db.session.commit()

            db.session.refresh(user)

            updated_cart = [item.product_id for item in user.shoppingCart]
            return jsonify({'msg': 'Product removed from shopping cart' , 'updatedCart': updated_cart}), 200
        else:
        
            new_item = ShoppingCart(user_id=id, product_id=product_id)
            db.session.add(new_item)
            db.session.commit()

        # Actualizar la lista del carrito
        updated_cart = [item.product_id for item in user.shoppingCart]
        return jsonify({'msg': 'Added to shopping cart successfully', 'updatedCart': updated_cart}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    
    
@api.route('/shopping_cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_shopping_cart(product_id):
    try:
        id = get_jwt_identity()
        user = Users.query.get(id)
        if not user:
            return jsonify({'msg':'Unauthorized: User not found'}), 401 
        if not id:
            return jsonify({'msg': 'User ID is required'}), 400
        
        item = ShoppingCart.query.filter_by(user_id=id, product_id=product_id).first()
        if not item:
            return jsonify({'msg': 'Item not found in shopping cart'}), 404
        
        # Eliminar el producto del carrito
        db.session.delete(item)
        db.session.commit()

        return jsonify({'msg': 'Removed from shopping cart successfully'}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400

