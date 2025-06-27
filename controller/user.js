const bcrypt = require("bcrypt");
const user = require("../models/user");
const auth = require("../auth");
const {errorHandler} = require("../auth");

module.exports.registerUser = (req,res) => {
    let newUser = user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    
    if(!req.body.email || !req.body.email.includes("@")){
        return res.status(400).send({error: "Ang iyon email ay hindi wasto."})
    }

    if(!req.body.firstname.trim() === "" || !req.body.lastname.trim === ""){
        return res.status(400).send({error: "FirstName and LastName is required."});
    }

    if(req.body.password.length < 8){
        return res.status(400).send({error: "Dapat ang iyon password ay may habang walong characters"})
    }
    
    return newUser.save()
    .then((result) => res.status(201).send({    
        message: "Registered Successfully"
    }))
    .catch(error => errorHandler(error,req,res))
};

module.exports.LoginUser = (req,res) => {
    if(req.body.email.includes("@")) {

		return user.findOne({ email: req.body.email})
		.then(result => {
			if (result == null) {
				return res.status(404).send({ error: 'Wala ang Email na ito.'})
			}

			if(req.body.email == null || req.body.password == null) {
				return res.status(401).send({ error: 'D nagmatch ang email at password'});
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

					if(isPasswordCorrect) {
						return res.status(200).send({ access: auth.createAccessToken(result) });
					} else {
						return res.status(401).send(false);
					}
			}
		}).catch(error => errorHandler(error,req,res))

	} else {
		return res.status(400).send(false);
	}
}

module.exports.GetUsers = (req,res) => {
    return user.findById(req.user.id).then(result =>{
        if(result){
            return res.status(200).send(result)
        } else{
            return res.status(404).send({error: "D mahanap si user"})
        }
    }).catch(error => errorHandler(error,req,res))
}