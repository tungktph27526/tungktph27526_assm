const express = require('express')
const app = express()
const port = 8000
var fs = require('fs')
const multer = require('multer');
const bodyParser = require('body-parser')
const path = require('path');
const expressHbs = require('express-handlebars');


app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('home', {
    layout: 'login',
    showFailLogin: false,
  });
})
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'home',
  layoutsDir: 'views/',
}));
app.get('/signin', (req, res) => {
  res.render('defaultView', {
    layout: 'signin',
  })
})
app.get('/quantri', (req, res) => {
  res.render('defaultView', {
    layout: 'quantri',
  })
})
app.set('view engine', '.hbs');

app.post('/signin', (req, res) => {
  let dataUser = req.body
  fs.readFile('userData.json', function (err, data) {

      let obj = JSON.parse(data)
      let da = fs.readFileSync('userData.json')
      let myData = JSON.parse(da)
      let arr = dataUser.imgRes.split('.')
      let newFilename = arr[0] + '-' + Date.now() + '.' + arr[1]
      let newObj = { "id": obj[obj.length - 1].id + 1, "email": dataUser.emailRes, "name": dataUser.nameRes, "pass": dataUser.passRes}
      myData.push(newObj)
      let newData = JSON.stringify(myData)
      fs.writeFile('userData.json', newData, function (err) {
          if (err) throw err;
          // upload(req, res, function (err) {
          //     console.log('thanh cong');
          // })
          res.render('home', { layout: 'signin', wrong: false })
      })
      console.log(myData);
  })
})

// app.get('/addNew', (req, res) => {
//   let emailRes = req.query.emailRes
//   let passRes = req.query.passRes
//   let nameRes = req.query.nameRes
//   let imgRes = req.query.imgRes
//   fs.readFile('userData.json', function (err, data) {
//       let obj = JSON.parse(data)
//       let da = fs.readFileSync('userData.json')
//       let myData = JSON.parse(da)
//       let newObj = { "id": obj[obj.length - 1].id + 1, "email": emailRes, "name": nameRes, "pass": passRes, "image": imgRes }
//       myData.push(newObj)
//       let newData = JSON.stringify(myData)
//       fs.writeFile('userData.json', newData, function (err) {
//           if (err) throw err;
//           res.redirect('/listUsers')
//       })

//   })
// })

// app.get('/listUsers', (req, res) => {
//   let emailUser = req.query.email
//   let passUser = req.query.password
//   let nameUser = req.query.name
//   let imgUser = req.query.img
//   let userNum = req.query.userNum
//   fs.readFile('userData.json', function (err, data) {
//       if (!userNum) {
//           let obj = JSON.parse(data)
//           res.render('home', { layout: 'login', userData: obj })
//       } else {
//           let da = fs.readFileSync('userData.json')
//           let myData = JSON.parse(da)
//           for (let i = 0; i < myData.length; i++) {
//               if (myData[i].id == userNum) {
//                   myData[i].email = emailUser
//                   myData[i].pass = passUser
//                   myData[i].name = nameUser
//                   myData[i].image = imgUser
//                   break
//               }
//           }
//           let newData = JSON.stringify(myData)
//           fs.writeFile('userData.json', newData, function (err) {
//               if (err) throw err;
//               res.redirect('/listUsers')
//           })
//       }
//   })
// })

// app.get('/login', (req, res) => {
//   let email = req.query.email
//   let pass = req.query.password
//   let check = false
//   fs.readFile('usersData.json', function (err, data) {
//       // if (err) throw err
//       let obj = JSON.parse(data)
//       for (let i = 0; i < obj.length; i++) {
//           if (email == obj[i].email && pass == obj[i].pass) {
//               check = true
//           }
//       }
//       if (check) {
//           res.render('home', { layout: 'main', userData: obj })
//       } else {
//           res.render('login', { layout: 'main', wrong: true })
//       }
//   })
// })

// app.get('/listPrs', (req, res) => {
//   let namePr = req.query.namePr
//   let pricePr = req.query.pricePr
//   let imgPr = req.query.imgPr
//   let colorPr = req.query.clPr
//   let typePr = req.query.tPr
//   let idUser = req.query.idKHPr
//   let prNum = req.query.prNum
//   let newUser
//   fs.readFile('productdata.json', function (err, data) {
//       if (!prNum) {
//           let obj = JSON.parse(data)
//           res.render('listProduct', { layout: 'main', prData: obj })
//       } else {
//           let da = fs.readFileSync('productdata.json')
//           let myData = JSON.parse(da)
//           for (let i = 0; i < myData.length; i++) {
//               if (myData[i].id == prNum) {
//                   fs.readFile('usersData.json', function (err, data) {
//                       let daU = fs.readFileSync('usersData.json')
//                       let myDataU = JSON.parse(daU)
//                       for (let j = 0; j < myDataU.length; j++) {
//                           if (myDataU[j].id == idUser) {
//                               myData[i].namePr = namePr
//                               myData[i].price = parseInt(pricePr)
//                               myData[i].imgPr = imgPr
//                               myData[i].color = colorPr
//                               myData[i].type = typePr
//                               myData[i].idUser = parseInt(idUser)
//                               myData[i].nameUser = myDataU[j].name
//                               console.log("ok vao day" + myData[i].price);
//                               let newData = JSON.stringify(myData)
//                               fs.writeFile('productdata.json', newData, function (err) {
//                                   if (err) throw err;
//                                   res.redirect('/listPrs')
//                               })
//                               break
//                           }
//                           res.redirect('/listPrs')
//                           break

//                       }
//                       console.log(namePr + " va " + pricePr);
//                   })
//               }
//           }
//       }

//   })

// })
// app.get('/addNewPr', (req, res) => {
//   res.render('addproduct', { layout: 'addproduct' })
// })
// app.post('/addNewPr/done', (req, res) => {
//   fs.readFile('productdata.json', function (err, data) {
//       let newPr = req.body
//       let obj = JSON.parse(data)
//       let da = fs.readFileSync('productdata.json')
//       let myData = JSON.parse(da)
//       fs.readFile('usersData.json', function (err, data) {
//           let daU = fs.readFileSync('usersData.json')
//           let myDataU = JSON.parse(daU)
//           for (let j = 0; j < myDataU.length; j++) {
//               if (myDataU[j].id == newPr.idKHPr) {
//                   let newObj = { "id": obj[obj.length - 1].id + 1, "namePr": newPr.namePr, "price": newPr.pricePr, "imgPr": newPr.imgPr, "color": newPr.clPr, "type": newPr.tPr, "idUser": parseInt(newPr.idKHPr), "nameUser": myDataU[j].name }
//                   myData.push(newObj)
//                   console.log(myData);
//                   let newData = JSON.stringify(myData)
//                   fs.writeFile('productdata.json', newData, function (err) {
//                       if (err) throw err;
//                       res.redirect('/listPrs')
//                   })
//                   break
//               }
//           }
//           console.log(newPr);

//       })
//   })
// })
app.get('/login', function (req, res) {
  var username = req.query.user;
  var password = req.query.pass;
  
  if (username == "admin" && password == "123") {
    res.render('login', {
      layout: 'quantri.hbs',
    })
  } else {
    res.send('sai user hoac mk')
  }
});
app.use(express.static(__dirname + "/images"));
app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`)
});