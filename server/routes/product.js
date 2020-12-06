const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    // 가져온 이미지를 저장

    upload(req, res, err => {
        if(err) {
            return req.json({success: false, err});
        }
        return res.json({success: true, filePath: res.req.file.path, filename: res.req.file.filename});
    })
})

router.post('/', (req, res) => {
    // 받아온 정보를 DB에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    });
})

router.post('/products', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  console.log(req.body.filters)
  let findArgs = {};
  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0) {

      if(req.body.filters[key] === 'price') {

        findArgs[key] = {
          $gte : req.body.filters[key][0],
          $lte : req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  console.log(term);
  if(term) {
    Product.find(findArgs)
      .find({$text: {$search: term}})
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({
          success: true,
          products,
          postSize: products.length
        })
      })
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({
          success: true,
          products,
          postSize: products.length
        })
      })
  }

})

router.get('/products_by_id', (req, res) => {
  let productIds = req.query.id;
  const type = req.query.type;

  if(type === 'array') {
    productIds = productIds.split(',')
  }

  Product.find({_id: {$in: productIds}})
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({success: true, product})
    })

})


module.exports = router;