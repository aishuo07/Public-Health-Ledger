const Express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const Mongoose = require("mongoose");
const db = require('./config/config').get(process.env.NODE_ENV)
const Web3 = require('web3');
const jquery = require('jQuery');
const app = Express();
const config = require('./config/config').get(process.env.NODE_ENV)
const salt = 10
const jwt = require('jsonwebtoken')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs'); 
Mongoose.Promise = global.Promise
Mongoose.connect(db.DATABASE, {useNewUrlParser:true, useUnidentifiedTopology:true}, function(err){
    if(err) console.log(err)
    console.log("db Connected")
})
const port = 3032||process.env.port;


web3 = new Web3('HTTP://127.0.0.1:7545')
var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_greeting",
				"type": "string"
			}
		],
		"name": "setGreeting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_disease",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_severity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_isActive",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bloodgroup",
				"type": "string"
			}
		],
		"name": "setRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getAllRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disease",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "severity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "isActive",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodgroup",
						"type": "string"
					}
				],
				"internalType": "struct PHL.Record[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getElement",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGreeting",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disease",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "severity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "isActive",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodgroup",
						"type": "string"
					}
				],
				"internalType": "struct PHL.Record",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
contract = new web3.eth.Contract(abi, '0xA28370B81bD5460838b04789b8206633675DAB31');

abi2 = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fullname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bloodgrp",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getdetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "Username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "passhash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fullname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodgrp",
						"type": "string"
					}
				],
				"internalType": "struct userData.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "isEmailValid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "isUNameValid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pass",
				"type": "string"
			}
		],
		"name": "loginVerify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
profile = new web3.eth.Contract(abi2, '0x4ec62344Dbc5b1D729493E34990d445faaF5A381')
app.listen(port,()=> {
    console.log(`app is live at ${port}`);
});

app.get('/', function(req, res){
    res.render('home')
});
app.post('/api/register', function(req, res){
    profile.methods.createUser(req.body.username, req.body.email, req.body.password, req.body.firstname+req.body.lastname, req.body.bloodgroup).call().then(function(rec){
    if(rec){
        number = 0
        last = 'No Disease'
        contract.methods.getAllRecords().call().then(function(rec){
            for(var i = 0; i<rec.length;i++){
                if(req.body.username === rec[i][1]){
                    number+=1
                    last = rec[i]
                };
            }
            res.render('profile',{email: req.body.email, name: req.body.fullname, NumberOfCards: number, Recent: last, bloodgroup :req.body.bloodgroup});
        })
    }
    else{
        res.render('register',{iscorrect:true});
    }
        
});
});

app.get('/api/register', function(req, res){
    return res.render('register')
});

app.post('/api/login', function(req,res){
    profile.methods.loginVerify(req.body.username, req.body.password).call().then(function(rec){
        if(rec){
        var token  = jwt.sign(req.body.username, config.SECRET);
        number = 0
        last = "No Disease"
        contract.methods.getAllRecords().call().then(function(rec){
            for(var i = 0; i<rec.length;i++){
                if(req.body.username === rec[i][1]){
                    number+=1
                    last = rec[i]
                };
            }
            profile.methods.getdetails(req.body.username).call().then(function(reco){
            res.render('profile',{email: reco[1], name: req.body.fullname, NumberOfCards: number, Recent: last, bloodgroup: reco[4], token:token});
                console.log(reco)
        });
        })
    }
    else{
        res.render('login', {iscorrect: true});
    }
    });
})

app.get('/api/login', function(req, res){
    res.render("login", {iscorrect: false});
})


app.get('/api/profile', function(req,res){
    number = 0
    last = "No Disease"
    contract.methods.getAllRecords().call().then(function(rec){
        for(var i = 0; i<rec.length;i++){
            if(req.body.username === rec[i][1]){
                number+=1
                last = rec[i]
            };
        }
    console.log(req.body)
    res.render('profile',{email: req.body.email, name: req.body.fullname, NumberOfCards: number, Recent: last, bloodgroup:req.body.bloodgroup});
})
});

app.get('/api/logout', function(req, res){
    res.sendStatus(200, {message: "Logged Out"});
});
    
app.post('/api/addcard', function(req, res){
    contract.methods.setRecord(req.body.username, req.body.fullname, req.body.Dob, req.body.disease, req.body.severity, req.body.isactive, req.body.email, req.body.bloodgroup);
    number = 1
    contract.methods.getAllRecords().call().then(function(rec){
        for(var i = 0; i<rec.length;i++){
            if(req.body.username === rec[i][1]){
                number+=1
                last = rec[i]
            };
        }
    res.render('profile',{email: req.user.email, name: fullname, NumberOfCards: number, Recent: last, bloodgroup:req.body.bloodgroup});
})
});


app.get('/api/getcards/', function(req, res){
    var id = Number(req.query.id);
    number = 0;
    contract.methods.getRecord(id).call().then(function(record){
        contract.methods.getAllRecords().call().then(function(rec){
            for(var i = 0; i<rec.length;i++){
                if(record[1] === rec[i][1]){
                    number+=1
                };
            }
            res.render('cards',{email: record[7], name: record[1], fullname: record[2], disease: record[4], Dob: record[3], date:record[0], isactive:record[6], severity:record[5],  length: number});
        });
    });
})