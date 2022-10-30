const express = require('express');

const app = express();

const data = { 
   isOtpGenerated : false,
   validOtp:"", 
   secretEmail:"",
   isOtpValidated:false,
   isEmptyInputSubmitted:false
}

app.use(express.urlencoded({extended:true}));


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res )=>{
   res.render('pages/index', { data: data});
})

app.get('/otp', (req, res)=>{
   data.isOtpGenerated = false;
   res.render('pages/otp', {
      data
   })
})
app.get('/login', (req, res)=>{
   res.render('pages/login', { data });
})

app.post('/otp', (req,res)=>{
   const { email } = req.body;
   if(email)
   data.secretEmail = email;
   data.isOtpGenerated = true;
   let randomOtp =Math.floor(100000 + Math.random() * 900000)
   console.log("your otp is : "+ randomOtp);
   data.validOtp = randomOtp;
   setTimeout(() => {
         data.validOtp = "";
   }, 30000);
   res.status(200).render('pages/message');
})

app.post('/login', (req,res)=>{
   const {otp} = req.body;
   if(otp == data.validOtp){
      data.isOtpValidated = true;
      res.render('pages/success')
   }
   else{
      res.render('pages/error', { data });
   }
})

app.post('/logout', (req, res)=>{
   data.secretEmail = "";
   data.isOtpValidated = false;
   res.render('pages/index', {data});
})

app.listen(5000, ()=>{
   console.log("server is running at port 5000");
})