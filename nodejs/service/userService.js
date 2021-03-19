const User = require('./../model/user');


    const findAllUsers = async (res) => {
        await User.find((err, users) => {
            if(err) res.send(err);
            res.send(users);
        });
    }

    const findUserByUserName = async (req, res) => {
        let userName = req.body.userName;
        console.log(userName);
        await User.findOne({userName: userName}, (err, user) => {
            if(err) res.send(err);
            res.send(user);
        });
    }

    const findUser = async (req, res) => {
        let userName = req.body.userName;
        console.log(userName);
        await User.findOne({userName: userName}, (err, user) => {
            if(err) res.send(err);
            res.send(new Array(user));
        });
    }

    const deleteUserById = async (req, res) => {
        let userId = req.params.id;
        await User.deleteOne({_id: userId}, (err) => {
            if(err) res.send(false);
            res.send(true);
        });
    }

    const saveUpdateUser = async (req, res) => {
        if(req.body.userId === "") {
            let user = new User({
                userName: req.body.userName,
                password: req.body.password,
                allowedRole: req.body.allowedRole
            });
            await user.save((err, response) => {
                if(err) res.send(err);
                console.log(err);
                res.send(user); 
            });
        } else {
            await User.findByIdAndUpdate(req.body.userId, {$set: req.body}, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            }); 
        } 
    }

    const existsUserByUserName = async (req, res) => {
        let userName = req.body.userName;
        await User.exists({userName: userName}, (err, response) => {
            if(err) res.send(err);
            res.send(response);
        });
    }

    const getUsersByParams = async (req, res) => {
        let userName = req.body.userName;
        let role = req.body.role;
        await User.find({
            userName: {$regex: userName, $options: 'i'}, 
            role: {$regex: role, $options: 'i'}}, 
            (err, users) => {
                if(err) return err;
                res.send(users);
        });
    }

module.exports = {
    findAllUsers,
    findUserByUserName,
    findUser,
    deleteUserById,
    saveUpdateUser,
    existsUserByUserName,
    getUsersByParams
}