"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

## FALTAN IMPORTACIONES DESDE MODELS, QUE PREFIERO REVISAR JUNTOS
## ······················································· Cómo USER (profile):

@api.route('/register', methods=['POST'])
def register():
    try:        
        # aqui extraemos info
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        # aqui chequeamos que toda la info este
        if not email or not password:
            raise Exception('Missing data')
        
        # aqui chequeamos si usuario existe
        check_user= User.query.filter_by(email=email).first()

        # en caso no existe -> creamos usario
        if not check_user:
            new_user = User(email=email, password=password, is_active=True)  # aqui se creo nuevo usuario
            db.session.add(new_user)                                         # aqui se agrego a la tabla
            db.session.commit                                                #aqui se almacena cambios en la base de datos
            token = create_access_token(identity=str(new_user.id))
            return({"msg": "okey", 'token': token}), 201
        
        # si existe usuario, devolvemos que ya hay una cuenta con ese correo
        return jsonify({"msg": "Usuario vinculado a este correo, intenta iniciar session"}), 400
    except Exception as error:
        return jsonify({'error':str(error)}), 400
    

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
         # extract new data from the request
        email = request.json.get('email')
        password = request.json.get('password')

        # ensure there's at least one field to update
        if not email and not password:
            return jsonify({'msg': 'No data provided to update'}), 400
        
        # retrieve the user by ID
        user = User.query.get(user_id)
        if not user:
            return jsonify({'msg': 'User not found'}), 404
        
        # update fields if provided
        if email:
            # check if email is already in use by another user
            existing_user = User.query.filter_by(email=email).first()
            if existing_user and existing_user.id != user_id:
                return jsonify({'msg': 'Email is already in use'}), 400
            user.email = email

    #aqui necesito ayuda porque no se si usar hash esta? !!!!!!!
    #
        if password:
            hashed_password = generate_password_hash(password, method='sha256')
            user.password = hashed_password

        # save the changes to the database
        db.session.commit()

        return jsonify({'msg':'User updated successfully'}), 200
    except Exception as error:
        return jsonify({'error':'str(error)'}), 400
    
api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        #retrieve the user by id
        user = User.query.get(user_id)
        if not user:
            return jsonify({'msg': 'User not found'}), 404
        
        #delete user
        db.session.delete(user)
        db.session.commit

        return jsonify({'msg': 'User deleted successfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
api.route('/users', methods=['GET'])  #para ver otros user
def get_users():
    try:
        # retrieve all users
        users = User.query.all()
        users_list = [{'id': user.id, 'email':user.email, 'is_active': user.is_active} for user in users]

        return jsonify(users_list), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
api.route('/follow/<int:follow_id', methods=['POST'])
def follow_user(follow_id):
    try:
        current_user_id = request.json.get('user_id', None)

        if not current_user_id:
            return jsonify({'msg': 'Missing current user ID'}), 400
        
        current_user = User.query.get(current_user_id)
        follow_user = User.query.get(follow_id)

        if not current_user or not follow_user:
            return jsonify({'msg': 'User not found'}), 404
        
        db.session.commit()

        return jsonify({'msg': 'f user {follow_id} followed successfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    



    ##·······················································  Cómo USER(buy/sell):

@api.route('/product', methods=['POST'])
def create_product():
    try:
        #extract product details from the request
        name = request.json.get('name', None)
        description = request.json.get('description', None)  # agregamos como en la tabla: photo,year, brand, platform, stock etc?
        price = request.json.get('price', None)
        id = request.json.get('id', None)

        #validate required fields
        if not name or not description or not price or not id:
            return jsonify({'msg': 'Name, description, price and id are required'}), 400
        
        #create a new product
        new_product = Product(name=name, description=description, price=price, id=id)
        db.session.add(new_product)
        db.session.commit

        return jsonify({'msg': 'Product created successfully', 'product': new_product.id}), 201
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    

api.route('/product/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        # extract user_id from the request
        user_id = request.json.get('user_id', None)

        # find the product by id
        product = Product.query.get(product_id)
        if not product or product.user_id != user_id:
            return jsonify({'msg': 'Product not found or not owned by the user'}), 404
        
        #update product details
        product.name = request.json.get('name', product.name)
        product.description = request.json.get('description', product.description)
        product.price = request.json.get('price', product.price)

        db.session.commit()
        return jsonify({'msg': 'Product updated successfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    

@api.route('/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        #extract user id from the request
        user_id = request.json.get('user_id', None)

        #find product id
        product =  Product.query.get(product_id)
        if not product_id or product.user_id != user_id:
            return jsonify({'msg': 'Product not found'}), 404
        
        #delete product
        db.session.delete(product)
        db.session.commit()
        return jsonify({'msg': 'Product deleted successfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400



api.route('/products', methods=['GET'])
def get_products():
    try:
        # bring all products
        products = Products.query.all()
        products_list = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price
            } for product in products
        ]
        return jsonify(products_list), 200
    except Exception as error:
        return jsonify({'error': str(error)})
    

    ##······················································· Cómo USER favs. 

api.route('/favorites', methods=['POST'])
def add_to_favorites():
    try:
        #extract user_id and product_id from the request
        user_id = request.json.get('user_id', None)
        product_id = request.json.get('product_id', None)

        #validate required fields
        if not user_id or not product_id:
            return jsonify({'msg': 'User ID and product ID are required'}), 400
        
        # check if favorite already exist
        existing_favorite = Favorite.query.filter_by(user_id=user_id, product_id=product_id).first()
        if existing_favorite:
            return jsonify({'msg': 'Product already in favorites'}), 400
        
        # add to favorites
        new_favorite = Favorite(user_id=user_id, product_id=product_id)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({'msg': 'Added to favorites successfully'}), 201
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
@api.route('/favorites/<int:product_id>', methods=['DELETE'])
def remove_from_favorites(product_id):
    try: 
        #extract user_id from the request
        user_id = request.json.get('user_id', None)

        #validate required fields
        if not user_id:
            return jsonify({'msg': 'User ID is required'}), 400
        
        #find the favorite
        favorite = Favorite.query.filter(user_id=user_id, product_id=product_id).first()
        if not favorite:
            return jsonify({'msg': 'Favorite not found'}), 404
        
        #remove from favorites
        db.session.remove(favorite)
        db.session.commit()

        return jsonify({'msg': 'Removed from favorites successfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
api.route('/favorites', methods=['GET'])
def get_favorites():
    try:
        #extract user from the request
        user_id = request.args.get('user_id', None)

        # validate required field
        if not user_id:
            return jsonify({'msg':'User ID is required'}), 400
        
        #brin all favorite products for the useer
        favorites = Favorites.query.filter_by(user_id=user_id).all()
        favorites_list = [{'id': fav.id, 'product_id':fav.product_id} for fav in favorites]

        return jsonify({'favorites': favorites_list}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    



    ##··········································································Cómo USER en CHECKOUT:

@api.route('/checkout', methods=['POST'])
def add_to_checkout():
    try:
        # extract user_id and product_id from the request
        user_id = request.json.get('user_id', None)
        product_id = requst.json.get('product_id', None)

        #validate required fields
        if not user_id or not product_id:
            return jsonify({'msg': 'User ID and Product ID are required'}), 400

        #chec if the product is already in checkout
        existing_checkout_item = Checkout.query.filter_by(user_id=user_id, product_id=product_id).first()
        if existing_checkout_item:
            return jsonify({'msg': 'Product already in checkout'}), 400
        
        #add product to the users checkout
        new_checkout_item = Checkout(user_id=user_id, product_id=product_id)
        db.session.add(new_checkout_item)
        db.session.commit()

        return jsonify({'msg': 'Product added to the checkout successfully'}), 201
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    

@api.route('/checkout/<int:product_id>', methods=['DELETE'])
def remove_from_checkout(product_id):
    try:
        #Extract user_id from the request
        user_id = request.json.get('user_id', None)

        #validate required fields
        if not user_id:
            return jsonify({'msg': 'User ID is required'}), 400
    
        #find the checkout item by user_id and product_id
        checkout_item = Checkout.query.filter_by(user_id=user_id, product_id=product_id).first()
        if not checkout_item:
            return jsonify({'msg': 'Product not found in checkout'}), 404
        
        #remove from chechout 
        db.session.delete(checkout_item)
        db.session.commit()

        return jsonify({'msg':'Product removed from the checkout succesfully'}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 400


    

@api.route('/checkout', methods=['GET'])
def get_checkout():
    try:
        # Extract user_id from the request
        user_id = request.args.get('user_id', None)

        #validate required fields
        if not user_id:
            return jsonify({'msg': 'user ID is required'}), 400
        
        #retrieve all checkout items for the user
        checkout_items = Checkout.query.filter_by(user_id=user_id).all()
        checkout_list = [{'id': item.id, 'product_id': item.product_id} for item in checkout_items]

        return jsonify({'checkout': checkout_list}), 200
    except Exception as error:
        return jsonify({'error': str(error)}),400
    

   


