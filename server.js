const express = require('express')
const mongoose = require('mongoose')
const uri = 'mongodb+srv://tungktph27526:kttung2609@cluster0.mdas35v.mongodb.net/ASSM?retryWrites=true&w=majority'
const expressHbs = require('express-handlebars')
const mongodb = require('mongodb')
const app = express();
const user = require('./model/userModel')
const ProductModel = require('./model/ProductModel');
const request = require('request');
// const session = require('session')
const check = (item) => {
  if (item == 1) {
      return "Admin";
  }
  return "User";
}
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/"
}))
app.set('view engine', '.hbs')

app.get('/', (req,res) =>{
  res.render('dangky')
})
app.get('/signup', async (req, res) => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const username = req.query.tennd;
	const password = req.query.mk;
	console.log(username);

	user.findOne({
		ten: username,
	})
		.then(data => {
			if (data) {
				console.log('tài khoản đã tồn tại')
			} else {
				return user.create({
					ten: username,
					matkhau: password,
					

				})
					.then(data => {
						console.log('thành công')
						res.render('dangnhap')
					})
			}
		})
		.catch(err => {
			res.status(500).json('tạo thất bại');
		})
})
app.get('/signinin', async function (req, res) {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const name = req.query.username;
	const password = req.query.pass;
	user.findOne({
		ten: name,
		matkhau: password,
	})
		.then(async data => {
			if (data) {
				// req.session.user = data;
				const productList = await ProductModel.find().lean();
				res.redirect('listproduct')
			} else {
				res.json('Thất bại')
			}
		})


	// Save user in session

});
app.get('/listproduct', async (req, res) => {
  try {
      await mongoose.connect(uri)
      const listPr = await ProductModel.find().lean()
      res.render('listproduct', { prData: listPr })
  } catch (error) {
      console.log(error);
  }
})

app.get('/add_pr', async(req, res) =>{
  let namePr = req.query.tensp
  let pricePr = parseInt(req.query.giasp)
  let imgPr = req.query.imgPr
  let colorPr = req.query.mausac
  let typePr = req.query.loaisp
  let nameUser = req.query.tenkh
  let pr = new ProductModel({
    tensp: namePr,
    dongia: pricePr,
    mausac: colorPr,
    loaisp: typePr,
    tenkh: nameUser
  })
    try {
        await pr.save()
        res.redirect('/listproduct')
    } catch (error) {
    }

})
app.get('/deletePr', async (req, res) => {
  let idPr = req.query.prDelete
  try {
    ProductModel.collection.deleteOne({ _id: new mongodb.ObjectId(`${idPr}`) })
      res.redirect('/listproduct')
  } catch (error) {
  }
  console.log(idPr);
})
app.get('/up_pr', async (req, res) => {
  let idUp = req.query.prUpdate
  // // let nvNew = await nhanvienModel.find({_id: new mongodb.ObjectId(`${idUp}`)})
  // console.log(idUp);
  try {
      const listPr = await ProductModel.find().lean()
      let prUp = await ProductModel.find({ _id: new mongodb.ObjectId(`${idUp}`) }).lean()
      res.render('updateProduct', { prData: listPr, pr: prUp[0], index: idUp })
  } catch (error) {
      console.log(error);
  }
})
app.get('/up_pr/update', async (req, res) => {
  let namePrup = req.query.tensp
  let pricePrUp = parseInt(req.query.giasp)
  let colorPrUp = req.query.mausac
  let typePrUp = req.query.loaisp
  let prNameKHUp = req.query.tenkh
  let idPr = req.query.idPr
  try {
      await mongoose.connect(uri)
      await ProductModel.collection.updateOne({ _id: new mongodb.ObjectId(`${idPr}`)}, { $set: { tensp: namePrup, dongia: pricePrUp, mausac: colorPrUp, loaisp: typePrUp, tenkh: prNameKHUp } })
      res.redirect('/listproduct')        
  } catch (error) {
      
  }
})
app.get('/listuser', async (req, res) => {
  try {
      await mongoose.connect(uri)
      const listUs = await user.find().lean()
      res.render('listUser', { dataUser: listUs })
  } catch (error) {
      console.log(error);
  }
})
app.get('/add_user', async(req, res) =>{
  let name = req.query.ten
  let pass = req.query.matkhau
  
  let us = new user({
    ten: name,
    matkhau:pass,
  })
    try {
        await us.save()
        console.log(name)
        res.redirect('/listuser')
    } catch (error) {
    }

})
app.get('/deleteUser', async (req, res) => {
  let idUs = req.query.usDelete
  try {
    user.collection.deleteOne({ _id: new mongodb.ObjectId(`${idUs}`) })
      res.redirect('/listuser')
  } catch (error) {
  }
  console.log(idUs);
})
app.get('/up_us', async (req, res) => {
  let idUp = req.query.usUpdate
  // // let nvNew = await nhanvienModel.find({_id: new mongodb.ObjectId(`${idUp}`)})
  // console.log(idUp);
  try {
      const listUs = await user.find().lean()
      let usUp = await user.find({ _id: new mongodb.ObjectId(`${idUp}`) }).lean()
      res.render('updateUser', { dataUser: listUs, us: usUp[0], index: idUp })
  } catch (error) {
      console.log(error);
  }
})
app.get('/up_us/update', async (req, res) => {
  let name = req.query.ten
  let pass = req.query.matkhau
  let idUs = req.query.idUs
  try {
      await mongoose.connect(uri)
      await user.collection.updateOne({ _id: new mongodb.ObjectId(`${idUs}`)}, { $set: { ten: name, matkhau: pass} })
      res.redirect('/listuser')        
  } catch (error) {
      
  }
})
app.use(express.static(__dirname + "/images"));
app.listen(8000, (req, res) => {
  console.log("Dang chay");
})