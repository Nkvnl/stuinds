var express    = require("express"); // call express
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var app        = express();



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", function(req, res){
    res.render("index");
});



app.post("/send", (req, res) => {
    var name = (req.body.name);
    var output = `
    <h3> Nieuw bericht van ${req.body.name}.<h3>
    <h5> Details <h5>
    <ul>
        <li>Naam : ${req.body.name}</li>
        <li>Email : ${req.body.email}</li>
        <li>Telefoon : ${req.body.tel}</li>
    </ul>
    <p>Bericht : ${req.body.bericht}<p>
    `
    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mailserver163@gmail.com',
        pass: 'ma1ls3rv3r'
    }
});
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"www.passiermuziekemmen.nl" <mailserver163@gmail.com>', // sender address
        to: 'niek_losenoord@hotmail.com', // list of receivers
        subject: name + ' Heeft een bericht gestuurd via de website.', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    var msg = "Bedankt voor je bericht! Binnen 24 uur zijn we bij je terug."
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
        res.render("contact-bedankt")
        
    });
});

// app = express.createServer();

// app.use(express.bodyParser());

// app.post('/formProcess', function (req, res) {
//     var data=req.body;
//   var Naam = req.body["g52-name"];
//   var mail = req.body["g52-email"];
//   var Telefoon = req.body["g52-website"];
//   var Bericht = req.body["g52-comment"];

//     var smtpTransport = nodemailer.createTransport("SMTP",{
//       service: "Gmail", 
//       auth: {
//       user: "niekvanlosenoord@gmail.com",
//       pass: "*******"
//       }});

//   smtpTransport.sendMail({  //email options
//   from: "Sender Name <3DWD@gmail.com>",
//   to: "Receiver Name <niekvanlosenoord@email.com, niek_losenoord@hotmail.com>", // receiver
//   subject: "Nieuw bericht op 3DWD", // subject
//   html: "here your data goes" // body (var data which we've declared)
//     }, function(error, response){  //callback
//          if(error){
//           console.log("De mailserver is tijdelijk offline, probeer het later opnieuw of mail mij direct op niek_losenoord@hotmail.com");
//         }else{
//           console.log("Bedankt voor je bericht! U krijgt binnen 24 uur reactie.");
//       }

//   smtpTransport.close(); 
//     }); });

app.listen(process.env.PORT, process.env.IP, function(){ // tell node to listen & define a port to view app
    console.log("Passier server starting...");
});