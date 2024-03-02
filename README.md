POST /users/login
POST /users/signup

GET /products/

GET /carts/
POST /carts/
PATCH /carts/:id
DELETE /carts/:id

User{
    email: String, required, unique
    name: String, required, unique
    password: String, required ,//min:8, max:20
    age: Number
}

Product{
    name: String, required
    description: String,
    image: String
    price: Number, required, min:1
    quantity: Number, required
}

Cart{
    user: User, required
    product: Product, required
    quantity: Number
}
