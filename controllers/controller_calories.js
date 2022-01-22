const user = require("../models/model_users");
const portfir = require("../models/model_portfir");
const card = require("../models/model_card");
const product = require("../models/model_product")
const calories = require("../models/model_calories");
const ObjectId = require('mongodb').ObjectId;

const getProductCalories = async (req, res) => {

     let splitedName = req.body.name.split(" ");
 
    if (splitedName.length == 2) {
        console.log(splitedName[0]);
        console.log(splitedName[1]);


        let productsList = await portfir.find();

        let lista1 = productsList.filter(pr => pr.nome.toLowerCase().includes(splitedName[0].toLowerCase()));
        let lista2 = productsList.filter(pr => pr.nome.toLowerCase().includes(splitedName[1].toLowerCase()));

        let together = [];

        for (let i = 0; i < lista1.length; i++) {
            for (let j = 0; j < lista2.length; j++) {
                if (lista1[i].code === lista2[j].code) {
                    together.push(lista2[j]);
                    break;
                }
            }
        }
        res.status(200).json({
            together: together
        })
    } else {
        let productsList = await portfir.find();

        let lista1 = productsList.filter(pr => pr.nome.toLowerCase().includes(req.body.name.toLowerCase()));

       
        res.status(200).json({
            lista1: lista1
        })
    }
}

const createPortfirProduct = async (req, res, next) => {
    if (req.body.code === 0) {
        let codeCheck = {}
        let randomCode = 0;
        if (!req.body.name) {
            let productFind = await product.findById(req.params.id);
            req.body.name = productFind.name
        }
        while (codeCheck != null) {
            randomCode = Math.floor(Math.random() * 3000) + 1276;

            codeCheck = await portfir.findOne({ code: randomCode });
            console.log(codeCheck);
        }

        if (!codeCheck) {
            console.log(randomCode);
        }
        const newPortfir = new portfir({
            "code": randomCode,
            "nome": req.body.name,
            "energia": req.body.energia,
            "lipidos": req.body.lipidos,
            "hidratos": req.body.hidratos,
            "acucares": req.body.acucares,
            "fibra": req.body.fibra,
            "proteina": req.body.proteina,
            "sal": req.body.sal
        })

        await newPortfir.save(function (err, portfir) {
            if (err) {
                res.status(400).send(err);
            }
            console.log(portfir);
            req.body.code = randomCode;
            next();
        });
    } else {
        next();
    }
}


const addPortfirProduct = async (req, res) => {
    if (req.body.code) {
        await product.updateOne({ _id: ObjectId(`${req.body.product}`) }, {
            $set: {
                'code': req.body.code
            }
        }, function (err, productEdited) {
            if (err) {
                res.status(400).send(err);
            }
            if (productEdited.modifiedCount == 1) {
                res.status(200).json("Product updated.");
            }
        })
    } else {
        let codeCheck = {}
        let randomCode = 0;
        let productFind = await product.findById(req.body.product);
        while (codeCheck != null) {
            randomCode = Math.floor(Math.random() * 3000) + 1276;

            codeCheck = await portfir.findOne({ code: randomCode });
            console.log(codeCheck);
        }

        if (!codeCheck) {
            console.log(randomCode);
        }
        const newPortfir = new portfir({
            "code": randomCode,
            "nome": productFind.name,
            "energia": req.body.energia,
            "lipidos": req.body.lipidos,
            "hidratos": req.body.hidratos,
            "acucares": req.body.acucares,
            "fibra": req.body.fibra,
            "proteina": req.body.proteina,
            "sal": req.body.sal
        })

        await newPortfir.save(function (err, portfir) {
            if (err) {
                res.status(400).send(err);
            }
        });

        await product.updateOne({ _id: ObjectId(`${req.body.product}`) }, {
            $set: {
                'code': randomCode
            }
        }, function (err, productEdited) {
            if (err) {
                res.status(400).send(err);
            }
            if (productEdited.modifiedCount == 1) {
                res.status(200).json("Product updated.");
            }
        })
    }

}

exports.getProductCalories = getProductCalories;
exports.addPortfirProduct = addPortfirProduct;
exports.createPortfirProduct = createPortfirProduct;