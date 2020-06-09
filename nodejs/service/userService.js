let User = require('./../model/user');

class UserService {

    findAllUsers(res) {
        User.find((err, users) => {
            if(err) res.send(err);
            res.send(users);
        });
    }

    findUserByUserName(req, res) {
        let userName = req.body.userName;
        console.log(userName);
        User.findOne({userName: userName}, (err, user) => {
            if(err) res.send(err);
            res.send(user);
        });
    }

    findUser(req, res) {
        let userName = req.body.userName;
        console.log(userName);
        User.findOne({userName: userName}, (err, user) => {
            if(err) res.send(err);
            res.send(new Array(user));
        });
    }

    deleteUserById(req, res) {
        let userId = req.params.id;
        User.deleteOne({_id: userId}, (err) => {
            if(err) res.send(false);
            res.send(true);
        });
    }

    saveUpdateUser(req, res) {
        if(req.body.userId === "") {
            let user = new User({
                userName: req.body.userName,
                password: req.body.password,
                allowedRole: req.body.allowedRole
            });
            user.save((err, response) => {
                if(err) res.send(err);
                console.log(err);
                res.send(user); 
            });
        } else {
            User.findByIdAndUpdate(req.body.userId, {$set: req.body}, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            }); 
        } 
    }

    existsUserByUserName(req, res) {
        let userName = req.body.userName;
        User.exists({userName: userName}, (err, response) => {
            if(err) res.send(err);
            res.send(response);
        });
    }

    getUsersByParams(req, res) {
        let userName = req.body.userName;
        let role = req.body.role;
        User.find({
            userName: {$regex: userName, $options: 'i'}, 
            role: {$regex: role, $options: 'i'}}, 
            (err, users) => {
                if(err) return err;
                res.send(users);
        });
    }
}

module.exports = UserService;