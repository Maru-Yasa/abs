const express = require('express')
const router = express.Router()
const bot = require('../telegramBot')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads/')
    },
    filename: function (req, file, cb) {
        if (path.extname(file.originalname) !== '.jpg' || '.png' || '.jpeg' ) {
            cb(null, file.fieldname + '-' + Date.now() + 
            path.extname(file.originalname));
        }else{
            cb(null,null)
        }
            
    }
  })

  
var upload = multer({ storage: storage })
const cpUpload = upload.array('bukti', 5)

// { nama: 'asdasdasd',
//   gender: 'perempuan',
//   kontak: 'adasdasd',
//   umur: '10',
//   kelas: 'adsasd',
//   asal: 'SMK N 1 Bantul',
//   korban: 'true',
//   perlakuan: [ 'verbal', 'fisik' ] }
router.route('/')
    .get((req,res) => {
        res.render('lapor')
    })
    .post(cpUpload,async (req,res) => {
        let data = req.body
        let file;
        console.log(req.files)
        if(req.files.length > 0){
             file = req.files[0].path
        }
        // console.log(`./uploads/${file}`,req.files)
        msg = `
[Ada Laporan Masuk]

Nama : ${data.nama}
Gender : ${data.gender}
Umur : ${data.umur}
Kontak : ${data.kontak}
Kelas : ${data.kelas}
Asal : ${data.asal}
Korban  : ${data.korban}
Perlakuan : ${data.perlakuan}`
        await bot.sendMessage(-1001563082765,msg)
        if (file) {
            await bot.sendPhoto( -1001563082765,file)            
            fs.unlinkSync(file)
        }
        res.redirect('/lapor/trimakasih')
    })

router.route('/trimakasih')
    .get((req,res) => {
         res.render('trimakasih')
    })

module.exports = router