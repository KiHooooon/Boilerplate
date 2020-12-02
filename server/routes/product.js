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

  Product.find()
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
})

module.exports = router;