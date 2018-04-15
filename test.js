
const Admin = require('./models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const password = 'mouna';

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hashedPassword) {
       
        const admin = new Admin({ name: "mouna",lastname:"dhaouadi", email: "mounaadhaouadi@gmail.com", pwd: hashedPassword });
        admin.save().then(
            res => console.log(res, hashedPassword)
        ).catch(err => console.error(err)
        );

    })
})