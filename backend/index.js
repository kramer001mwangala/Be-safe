const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { sendSTKPush, callBackURL } = require("./controllers/stk");
const app = express();
const PORT = 8000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

// db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const UssdMenu = require("ussd-builder");

app.get("/", (req, res) => {
  res.send("Success Message");
});

app.get("/incidents", (req, res) => {
  const sql = "SELECT * FROM incident";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/volunteers", (req, res) => {
  const sql = "SELECT * FROM volunteers";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

let menu = new UssdMenu();

let dataToSave = {};

const atCredentials = {
  apiKey: "319f88a0b2bb07dd74cf49fe141f3ec3dd60b4893cc0dbd54ce97d6f7133ae58",
  username: "jeezz",
};

const AfricasTalking = require("africastalking")(atCredentials);

const sms = AfricasTalking.SMS;

menu.startState({
  run: () => {
    menu.con(
      "Welcome! to Shes Safe: " +
        "\n1. Report An Incident " +
        "\n2. Volunteer" +
        "\n3. Latest Security update" +
        "\n4. Donate"
    );
  },
  next: {
    1: "Report An Incident",
    2: "Volunteer",
    3: "Latest security update",
    4: "Donate",
  },
});

menu.state("Report An Incident", {
  run: () => {
    menu.con("  Enter your name?");
  },
  next: {
    "*[a-zA-Z]+": "name",
  },
});

menu.state("name", {
  run: () => {
    let name = menu.val;
    dataToSave.name = name;
    console.log(dataToSave);

    menu.con("Enter Incident_Location");
  },

  next: {
    // using regex to match user input to net state

    "*[a-zA-Z]+": "Incident_location",
  },
});

menu.state("Incident_location", {
  run: async () => {
    let Incident_location = menu.val;
    dataToSave.Incident_location = Incident_location;
    console.log(dataToSave);

    menu.con("Date of incident ");
  },
  next: {
    "*[a-zA-Z]+": "_date",
  },
});

menu.state("_date", {
  run: async () => {
    let _date = menu.val;
    dataToSave._date = _date;
    console.log(dataToSave);

    menu.con("Describe The incident");
  },
  next: {
    "*[a-zA-Z]+": "Incident_descprition",
  },
});

menu.state("Incident_descprition", {
  run: async () => {
    let Incident_descprition = menu.val;
    dataToSave.Incident_descprition = Incident_descprition;
    const options = {
      to: menu.args.phoneNumber,
      message: `Hi ${dataToSave.name},  Thank you for reporting the incident. Our team will take appropriate action.`,
    };
    sms.send(options).then(console.log).catch(console.log);

    await sms
      .send(options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    menu.end("She's safe Empowering Awareness, Promoting Security");
  },
});

menu.state("Volunteer", {
  run: () => {
    menu.con("  Enter your Full Names?");
  },
  next: {
    "*[a-zA-Z]+": "Full_Names",
  },
});
menu.state("Full_Names", {
  run: () => {
    let Full_Names = menu.val;
    dataToSave.Full_Names = Full_Names;
    console.log(dataToSave);

    menu.con("Enter Area Of Residence");
  },

  next: {
    // using regex to match user input to net state

    "*[a-zA-Z]+": "Residence_Area",
  },
});

menu.state("Residence_Area", {
  run: async () => {
    let Residence_Area = menu.val;
    dataToSave.Residence_Area = Residence_Area;
    console.log(dataToSave);

    menu.con("Reason To volunteer ");
  },
  next: {
    "*[a-zA-Z]+": "volunteer_Reason",
  },
});

menu.state("volunteer_Reason", {
  run: async () => {
    let volunteer_Reason = menu.val;
    dataToSave.volunteer_Reason = volunteer_Reason;
    const options = {
      to: menu.args.phoneNumber,
      message: `Hi ${dataToSave.Full_Names},  Thank you for applying as a volunteer`,
    };
    sms.send(options).then(console.log).catch(console.log);

    await sms
      .send(options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    menu.end("She's safe Empowering Awareness, Promoting Security");
  },
});

menu.state("Latest security update", {
  run: () => {
    menu.end(
      "Here is Latest security update A girl was robbed on a matatu along thika road.The kidnappers took all of her belongings and left her stranded in MUthurwe  link to website for more updates"
    );
  },
});

menu.state("Donate", {
  run: () => {
    menu.con(" Amount To Donate");
  },
  next: {
    "*\\d+": "amount",
  },
});

menu.state("amount", {
  run: async () => {
    let amount = menu.val;
    let number = menu.args.phoneNumber;
    await sendSTKPush({ phoneNumber: number.split("+")[1], amount });
    menu.end("Your Donation has been received successfully");
  },
});

menu.state("quit", {
  run: () => {
    menu.end("Goodbye");
  },
});

app.post("/ussd", (req, res) => {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

app.post("/api/mpesa/callbackurl", async (req, res) => {
  res.send(await callBackURL(req.body));
});

app.listen(PORT, () => {
  console.log("App is listening on port: ", PORT);
});
