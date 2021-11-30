const express = require('express');
const path=require('path');
const ejs=require('ejs');
const methodOverride = require('method-override');
const mongoose=require('mongoose');

const fileUpload = require('express-fileupload');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {

  useNewUrlParser:true,
  useUnifiedTopology:true,
  
}).then(() => {
  console.log("Db connected");
}).catch((err) => {
  console.log(err);
})



app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());  
app.use(methodOverride('_method',{

  methods:['POST','GET']
}));

app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost );
app.delete('/posts/:id', postController.deletePost);

  
app.get('/about', pageController.getAboutPage);
  
app.get('/add', pageController.getAddPage);

app.get('/posts/edit/:id', pageController.getEditPage);


const port= process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
