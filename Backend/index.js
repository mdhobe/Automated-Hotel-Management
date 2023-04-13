const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const emp = require('./dbconnect')
const { v4: uuidv4 } = require('uuid')
const Pool = require("pg").Pool;
const randtoken = require('rand-token');
const passport = require('passport');
const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const express = require('express');
const jwt_decode = require('jwt-decode');
const { json } = require('body-parser');
const app = express();
const fs = require('fs');
const { send } = require('process');
const nodemailer = require("nodemailer");
const path = require('path');
const refreshTokens = {};
const SECRET = 'VERY_SECRET_KEY!';

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "hoteldb",
});

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}))

passport.serializeUser(function (user, done) {
  done(null, user.username)
});


app.post("/loginhotel", async (req, res) => {
  console.log("http:/localhost:8080/loginhotel");
  try {
    const { username, password } = req.body;
    let sql = "SELECT * FROM hotel WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    const details = await pool.query(sql);
    console.log(details)
    if (details["rows"].length > 0) {
      const user = {
        "username": req.body.username,
        "name": details["rows"][0]["name"]
      };
      const token = jwt.sign(user, SECRET, { expiresIn: "7d" });
      const refreshToken = randtoken.uid(256);
      const hotelname = details["rows"][0]["hotelname"];
      refreshTokens[refreshToken] = username;
      res.json({ jwt: token, refreshToken: refreshToken, hotelname: hotelname });
    }
    else {
      console.log("INVALID CREDENTIALS");
    }
  }
  catch (error) {
    console.log("CONNECTION ERROR");
    console.log(error);
  }
});

app.post("/loginmanagement", async (req, res) => {
  console.log("http:/localhost:8080/loginmanagement");
  try {
    let sql = "SELECT * FROM magementtajmumbai WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    const details = await pool.query(sql);
    if (details["rows"].length > 0) {
      res.json({ username: req.body.username });
    }
    else {
      res.json({ status: 'INVALID' });
    }
  }
  catch (error) {
    res.json({ status: 'INVALID' });
  }
});

app.get("/managementdata", async (req, res) => {
  console.log("http:/localhost:8080/managementdata");
  try {
    let sql = "SELECT * FROM magementtajmumbai WHERE (username = '" + req.query.username + "')";
    const details = await pool.query(sql);
    res.json({ managementdetail: details['rows'] })
  }
  catch (error) {
    res.json({ status: 'INVALID' });
  }
});

app.post("/loginchef", async (req, res) => {
  console.log("http:/localhost:8080/loginchef");
  try {
    let sql = "SELECT * FROM chef WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    const details = await pool.query(sql);
    if (details["rows"].length > 0) {
      const user = {
        "username": req.body.username,
        "name": details["rows"][0]["chefname"]
      };
      const token = jwt.sign(user, SECRET, { expiresIn: "7d" });
      const refreshToken = randtoken.uid(256);
      const chefname = details["rows"][0]["chefname"];
      refreshTokens[refreshToken] = req.body.username;
      res.json({ jwt: token, refreshToken: refreshToken, chefname: chefname });
    }
    else {
      console.log("INVALID CREDENTIALS");
    }
  }
  catch (error) {
    console.log("CONNECTION ERROR");
    console.log(error);
  }
});


app.post("/logout", function (req, res) {
  console.log("http:/localhost:8080/logout");
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});

app.post("/logoutchef", function (req, res) {
  console.log("http:/localhost:8080/logoutchef");
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});


app.get("/foodlist", async function (req, res) {
  console.log("http:/localhost:8080/foodlist");
  try {
    let sql = "SELECT * FROM fooditems";
    const details = await pool.query(sql);
    res.json({ foodlist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
})

app.get("/cheflist", async function (req, res) {
  console.log("http:/localhost:8080/cheflist");
  try {
    let sql = "SELECT chefname,uuid,available FROM chef";
    const details = await pool.query(sql);
    res.json({ cheflist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
})

app.get("/chefname", async function (req, res) {
  console.log("http:/localhost:8080/chefname");
  try {
    let sql = "SELECT * FROM chef WHERE ( chefname = '" + req.query.chefname + "')";
    const details = await pool.query(sql);
    res.json({ chefdetails: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
})

app.post("/updatechef", async function (req, res) {
  console.log("http:/localhost:8080/updatechef");
  try {
    pool.query("update chef set address=$1,phone=$2,email=$3 WHERE chefname=$4", [req.body.address, req.body.phone, req.body.email, req.body.chefname], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
})

app.post("/updatechefwithpassword", async function (req, res) {
  console.log("http:/localhost:8080/updatechefwithpassword");
  try {
    pool.query("update chef set address=$1,phone=$2,email=$3,password=$4 WHERE chefname=$5", [req.body.address, req.body.phone, req.body.email, req.body.password, req.body.chefname], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
})

app.post("/updatemanagement", async function (req, res) {
  console.log("http:/localhost:8080/updatechef");
  try {
    pool.query("update magementtajmumbai set address=$1,phone=$2,email=$3 WHERE username=$4", [req.body.address, req.body.phone, req.body.email, req.body.username], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
})

app.post("/updatemanagementwithpassword", async function (req, res) {
  console.log("http:/localhost:8080/updatemanagementwithpassword");
  try {
    pool.query("update magementtajmumbai set address=$1,phone=$2,email=$3,password=$4 WHERE username=$5", [req.body.address, req.body.phone, req.body.email, req.body.password, req.body.username], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
})

app.post("/orderinfo", async function (req, res) {
  console.log("http:/localhost:8080/orderinfo");
  try {
    let billnum = req.body.billnumber
    let cname = req.body.customername
    let cphone = req.body.mobile
    let cemail = req.body.email
    let chefida = req.body.chefid
    let statuss = "cooking"
    let chefn = req.body.chefname
    let tablenumber = req.body.tablenumber
    let totalamt = req.body.total
    let order = { order: req.body.order }
    pool.query("INSERT INTO tajmumbai(billnumber, customername, customerphone, customeremail, chefidassigned, chefname, tablenumber, orderlist, total, status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [billnum, cname, cphone, cemail, chefida, chefn, tablenumber, order, totalamt, statuss], (err, result) => {
        if (err) {
          res.send(err)
        }
        res.send(result)
      })
  }
  catch (error) {
    console.log("CONNECTION ERROR");
    res.send(error)
  }
});

app.get('/getallchefdata', async function (req, res) {
  console.log("http:/localhost:8080/getallchefdata");
  try {
    let sql = "SELECT chefname,username,phone,email,cheftitle,available,address,dateofjoining FROM chef";
    const details = await pool.query(sql);
    res.json({ cheflist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.post('/addchef', async function (req, res) {
  console.log("http:/localhost:8080/getallchefdata");
  try {
    const userId = uuidv4()
    pool.query("INSERT INTO chef(uuid, username, chefname, password, phone, email, dateofjoining, address, cheftitle, available) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [userId, req.body.username, req.body.name, req.body.username, req.body.phone, req.body.email, req.body.dateofjoining, req.body.address, req.body.title, 'true'], (err, result) => {
        if (err) {
          res.send(err)
        }
        res.send({ status: 'OK' })
      })
  }
  catch (error) {
    console.log(error)
  }
})

app.post('/addmanagement', async function (req, res) {
  console.log("http:/localhost:8080/addmanagement");
  try {
    const userId = uuidv4()
    pool.query("INSERT INTO magementtajmumbai(uuid, username, authorityname, password, phone, email, dateofjoining, address, title, leave) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [userId, req.body.username, req.body.name, req.body.username, req.body.phone, req.body.email, req.body.dateofjoining, req.body.address, req.body.title, 'present'], (err, result) => {
        if (err) {
          res.send(err)
        }
        res.send({ status: 'OK' })
      })
  }
  catch (error) {
    console.log(error)
  }
})

app.post('/addstock', async function (req, res) {
  console.log("http:/localhost:8080/addstock");
  try {
    pool.query("INSERT INTO stock(itemname,brand,lastfilleddate,price,weight,quantityremain) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [req.body.name, req.body.brand, req.body.refilldate, req.body.price, req.body.quantity, 30], (err, result) => {
        if (err) {
          res.send(err)
        }
        res.send({ status: 'OK' })
      })
  }
  catch (error) {
    console.log(error)
  }
})

app.get('/getallmanagementdata', async function (req, res) {
  console.log("http:/localhost:8080/getallmanagementdata");
  try {
    let sql = "SELECT authorityname,title,username,phone,dateofjoining,email,address,leave FROM magementtajmumbai";
    const details = await pool.query(sql);
    res.json({ managementlist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/getallstockdata', async function (req, res) {
  console.log("http:/localhost:8080/getallstockdata");
  try {
    let sql = "SELECT itemid,itemname,brand,lastfilleddate,quantityremain FROM stock";
    const details = await pool.query(sql);
    res.json({ stocklist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/getcheforder', async function (req, res) {
  console.log("http:/localhost:8080/getcheforder");
  try {
    let sql = "SELECT orderlist,status,billnumber FROM tajmumbai WHERE (chefname = '" + req.query.id + "')";
    const details = await pool.query(sql);
    res.json({ orderlist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/getcheforderhistory', async function (req, res) {
  console.log("http:/localhost:8080/getcheforderhistory");
  try {
    let sql = "SELECT billnumber,status FROM tajmumbai WHERE (chefname = '" + req.query.id + "' ) order by billnumber desc";
    const details = await pool.query(sql);
    res.json({ orderlist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/getstockdetails', async function (req, res) {
  console.log("http:/localhost:8080/getstockdetails");
  try {
    let sql = "SELECT * FROM stock WHERE (itemid = '" + req.query.id + "' )";
    const details = await pool.query(sql);
    res.json({ stocklist: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});


app.get('/updatestatuschef', async function (req, res) {
  console.log("http:/localhost:8080/updatestatuschef");
  try {
    pool.query("update tajmumbai set status='served' WHERE billnumber=$1", [req.query.billnumber], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/updatestatuspaid', async function (req, res) {
  console.log("http:/localhost:8080/updatestatuspaid");
  try {
    pool.query("update tajmumbai set status='paid',parent=$1 WHERE billnumber=$2", [req.query.billnumber, req.query.billnumber], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
});

app.post('/putstock', async function (req, res) {
  console.log("http:/localhost:8080/putstock");
  try {
    pool.query("update stock set itemname=$1,lastfilleddate=$2,brand=$3,price=$4,weight=$5,quantityremain=$6 WHERE itemid=$7", [req.body.name,req.body.date,req.body.brand,req.body.price,req.body.weight,req.body.quantityremain,req.body.id], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
});

app.post('/updatestatuspaidcombinebill', async function (req, res) {
  console.log("http:/localhost:8080/updatestatuspaidcombinebill");
  try {
    for (let bill of req.body.bills) {
      try {
        pool.query("update tajmumbai set status='paid',parent=$1 WHERE billnumber=$2", [req.body.newbill, bill], (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
      catch (error) {
        console.log(error)
      }
    }
    try {
      let sql = "SELECT * FROM tajmumbai WHERE (billnumber = '" + req.body.bills[0] + "')";
      const details = await pool.query(sql);
      pool.query("INSERT INTO tajmumbai(billnumber, customername, customerphone, customeremail, chefidassigned, chefname, tablenumber, orderlist, total, status, parent) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
        [req.body.newbill, details.rows[0].customername, details.rows[0].customerphone, details.rows[0].customeremail, '-', '-', '-', { orderlist: req.body.orders }, req.body.total, 'paid', req.body.newbill], (err, result) => {
          if (err) {
            console.log(err)
          }
        })
    }
    catch (error) {
      console.log(error)
    }
    res.json({ status: 'OK' })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/allinfo', async function (req, res) {
  console.log("http:/localhost:8080/allinfo");
  try {
    let sql = "SELECT * FROM tajmumbai order by billnumber desc";
    const details = await pool.query(sql);
    res.json({ list: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/allcurrentorder', async function (req, res) {
  console.log("http:/localhost:8080/allcurrentorder");
  try {
    let sql = "SELECT billnumber,orderlist,status,total FROM tajmumbai WHERE (customerphone = '" + req.query.mobile + "' and status != 'paid') order by billnumber desc";
    const details = await pool.query(sql);
    res.json({ data: details['rows'] })
  }
  catch (error) {
    console.log(error)
  }
});

app.get('/generatedsinglebill', async function (req, res) {
  console.log("http:/localhost:8080/generatedsinglebill");

  try {
    let sql = "SELECT * FROM tajmumbai WHERE (billnumber = '" + req.query.billnumber + "')";
    const details = await pool.query(sql);
    if (details["rows"].length > 0) {
      const bill = details["rows"][0]
      var pdf = require('./some/service').create(bill,bill["billnumber"]);
      var fpath = "bills/" + bill["billnumber"] + ".pdf"
      var fname= bill["billnumber"]+".pdf"
      pdf.pipe(fs.createWriteStream(fpath));
      pdf.end();

      
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'lavinatandon51@gmail.com',
            pass: 'yashikagoyal'
          }
        });
      
        // send mail with defined transport object
        transporter.sendMail({
          from: 'lavinatandon51@gmail.com', // sender address
          to: bill.customeremail, // list of receivers
          subject: "Taj Hotel-Order Bill", // Subject line
          text: "Hi, dear Customer, thanks for your visit, Visit Again", // plain text body
          html: "<b>Hi, "+bill.customername+",</b><br/><b>Thanks for visiting Taj Hotel, Visit Again</b> <br> Bill with GST number", // html body
          attachments: [{
            filename: fname,
            path: path.join("./bills/", fname),
            contentType: 'application/pdf'
          }]
        }, function (err, info) {
          if(err){
            console.log("in if")
            console.log(err)
          }
          
          else{
            console.log("in else")
            console.log(info);
          }
           
       });
    }
  }
  catch (error) {
    console.log(error)
  }
})



app.get('/generatedcompletebill', async function (req, res) {
  console.log("http:/localhost:8080/generatedcompletebill");
  try {
    let sql = "SELECT * FROM tajmumbai WHERE (parent = '"+req.query.billnumber+"' and billnumber = '"+req.query.billnumber+"')";
    const billdetails = await pool.query(sql);
    if (billdetails["rows"].length > 0) {
      const bill = billdetails["rows"][0]
      // console.log(bill)
      // for (let order of bill["orderlist"]['orderlist']) {
      //   console.log("orderlistlength="+bill.orderlist.orderlist.length)
      //   console.log("order")
      //   console.log(order)
      //   console.log("orderl="+order.length)
      //   for (let item of order) {
      //     //console.log("orderlength="+bill.orderlist.orderlist.order.length)
      //     console.log("item")
      //     console.log(item)
      //   }
      // }
      var pdf = require('./some/service1').create(bill,bill["parent"]);
      var fpath = "bills/bills/" + bill["parent"] + ".pdf"
      var fname = bill["parent"]+".pdf"
      await pdf.pipe(fs.createWriteStream(fpath));
      pdf.end();

      
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'lavinatandon51@gmail.com',
            pass: 'yashikagoyal'
          }
        });
      
        // send mail with defined transport object
        await transporter.sendMail({
          from: 'lavinatandon51@gmail.com', // sender address
          to: bill.customeremail, // list of receivers
          subject: "Taj Hotel-Order Bill", // Subject line
          text: "<b>Hi, "+bill.customername+",</b><br/><b>Thanks for visiting Taj Hotel, Visit Again</b>", // plain text body
          html: "<b>Hi, "+bill.customername+",</b><br/><b>Thanks for visiting Taj Hotel, Visit Again</b> <br> Bill with GST number", // html body
          attachments: [{
            filename: fname,
            path: path.join("./bills/bills/", fname),
            contentType: 'application/pdf'
          }]
        }, function (err, info) {
          if(err){
            console.log("in if")
            console.log(err)
          }
          
          else{
            console.log("in else")
            console.log(info);
          }
           
       });
      
      
    }
  }
  catch (error) {
    console.log(error)
  }
})


app.listen(8080,()=>{
  console.log("Listening at 8080")
});