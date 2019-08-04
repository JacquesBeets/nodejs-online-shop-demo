const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0]);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({ extended: false }));

// Sets up a folder were you can serve static files that is accessable by the user
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Catch All Middleware - 404 Page Error Page
app.use(errorController.get404Error);

// SEQUELIZE ASSOCIATIONS
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// SEQUELIZE DB SYNC
sequelize
  //   .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Jacques", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    console.log(user.name, user.email);
    return user.createCart();
  })
  .then(cart => {
    app.listen(30001);
    console.log("Listening on PORT:30001");
  })
  .catch(err => {
    console.log(err);
  });
