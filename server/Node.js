var express = require("express");
var app = express();
const path = require("path");
var fileuploader = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
var sql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors"); 
require("dotenv").config();
cloudinary.config({
  cloud_name: "dlrwcm7ji",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());

const MYSQ = sql.createConnection({
  host: "mysql-e263de3-nitj-c81f.e.aivencloud.com",
  port: 16666,
  user: "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false,
  },
});
MYSQ.connect(function (err) {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err.message);
  }
});

app.listen(2006, function () {
  console.log("Hello World");
  console.log(__dirname);
});



app.post("/submit-process", async function (req, resp) {
  const hashedPassword = await bcrypt.hash(req.body.Password, 10);

  MYSQ.query(
    "insert into credentials values(?,?,?,?,?)",
    [req.body.Username, req.body.Email, hashedPassword, req.body.UserT, 1],
    function (err) {
      if (!err) {
        resp.send("Updated Successfully");
      } else {
        resp.send(err.message);
      }
    },
  );
});

app.post("/login-process", function (req, resp) {
  console.log(req.body);
  MYSQ.query(
    "SELECT * FROM credentials where emailid = ?",
    [req.body.Email],
    async function (err, result) {
      if (err) {
        resp.send(err.message);
        return;
      }

      if (result.length === 1) {
        const match = await bcrypt.compare(
          req.body.Password,
          result[0].password,
        );

        if (match) {
          if (result[0].status == 1) {
            resp.send(result[0].usertype);
          } else {
            resp.send("Account Blocked");
          }
        } else {
          resp.send("Invalid Email or Password");
        }
      } else {
        resp.send("Invalid Email or Password");
      }
    },
  );
});

app.post("/submitcred", async function (req, resp) {
  try {
    const Email = req.body.Email;
    const Name = req.body.name;
    const contact = req.body.contact;
    const address = req.body.Address;
    const city = req.body.city;
    const gender = req.body.gen;
    const occu = req.body.occu;

    let adharname = "";
    let profname = "";

    if (req.files) {
      const adhar = req.files.adhar;
      const prof = req.files.profile;

      if (adhar) {
        const fullPath = path.join(__dirname, "upload", adhar.name);
        await adhar.mv(fullPath);
        const result = await cloudinary.uploader.upload(fullPath);
        adharname = result.url;
        console.log("Aadhaar uploaded:", adharname);
      }

      if (prof) {
        const fullPath = path.join(__dirname, "upload", prof.name);
        await prof.mv(fullPath);
        const result = await cloudinary.uploader.upload(fullPath);
        profname = result.url;
        console.log("Profile uploaded:", profname);
      }
    }

    MYSQ.query(
      "INSERT INTO Volprofile VALUES (?,?,?,?,?,?,?,?,?)",
      [Email, Name, contact, address, city, gender, occu, adharname, profname],
      function (err, result) {
        if (!err) {
          resp.send("Submitted Successfully");
        } else {
          resp.send(err.message);
        }
      },
    );
  } catch (err) {
    console.error("Submission error:", err);
    resp.status(500).send("Server Error: " + err.message);
  }
});

app.post("/updatecred", async function (req, resp) {
  let Email = req.body.Email;
  let Name = req.body.name;
  let contact = req.body.contact;
  let address = req.body.Address;
  let city = req.body.city;
  let gender = req.body.gen;
  let occu = req.body.occu;
  let adhar = req.files.adhar;
  let prof = req.files.profile;
  let adharname = "";
  let profname = "";
  MYSQ.query(
    "select * from Volprofile where emailid=?",
    [Email],
    async function (err, resarr) {
      if (resarr.length == 1) {
        adharname = resarr[0].adharurl;
        profname = resarr[0].picurl;
        console.log(adharname);
        console.log(profname);
      }
    },
  );

  if (req.files != null) {
    if (adhar) {
      adharname = adhar.name;

      let fullPath = __dirname + "/upload/" + adharname;

      adhar.mv(fullPath);

      await cloudinary.uploader.upload(fullPath).then(function (result) {
        adharname = result.url;

        console.log("Profile uploaded:", adharname);
      });
    }

    if (prof) {
      profname = prof.name;

      let fullPath = __dirname + "/upload/" + profname;

      prof.mv(fullPath);

      await cloudinary.uploader.upload(fullPath).then(function (result) {
        profname = result.url;

        console.log("Aadhaar uploaded:", profname);
      });
    }
  }
  MYSQ.query(
    "update Volprofile set name=?,contact=?,address=?,city=?,gender=?,occupation=?,adharurl=?,picurl=? where emailid=?",
    [Name, contact, address, city, gender, occu, adharname, profname, Email],
    function (err, resarr) {
      if (!err) {
        resp.send("Updated Successfully");
      } else {
        resp.send(err.message);
      }
    },
  );
});

app.post("/begsubmit-process", async function (req, resp) {
  let aiJsonData = {};

  let Email = req.body.email;
  let Name = req.body.name;
  let Age = req.body.age;
  let Gender = req.body.gen;
  let Address = req.body.address;
  let City = req.body.city;
  let type = JSON.stringify(req.body.type || []);
  let contact = req.body.contact;
  let IDProof = req.body.idproof;
  let proofno = req.body.proofno;

  let proofurl = req.files?.proof;
  let selfurl = req.files?.self;

  let proofname = "";
  let selfname = "";

  try {
    if (req.files != null) {
      if (proofurl) {
        proofname = proofurl.name;

        let full_path = __dirname + "/upload/" + proofname;
        await proofurl.mv(full_path);

        try {
          await cloudinary.uploader
            .upload(full_path)
            .then(async function (result) {
              proofname = result.url;
              console.log("Proof Uploaded:", proofname);
            });
        } catch (err) {
          console.log("Cloudinary Error:", err.message);
        }
      }
      if (selfurl) {
        selfname = selfurl.name;

        let full1_path = __dirname + "/upload/" + selfname;
        await selfurl.mv(full1_path);

        try {
          await cloudinary.uploader.upload(full1_path).then(function (result) {
            selfname = result.url;
            console.log("Self Uploaded:", selfname);
          });
        } catch (err) {
          console.log("Self Upload Error:", err.message);
        }
      }
    }

    MYSQ.query(
      "insert into Begprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        Email,
        Name,
        Age,
        Gender,
        Address,
        City,
        type,
        contact,
        IDProof,
        proofno,
        proofname,
        selfname,
      ],
      function (err) {
        if (!err) {
          resp.send("Submitted Successfully");
        } else {
          resp.send(err.message);
        }
      },
    );
  } catch (err) {
    console.log(err);
    resp.status(500).send("Server Error: " + err.message);
  }
});

app.post("/begupdate-process", async function (req, resp) {
  let Email = req.body.email;
  let Name = req.body.name;
  let Age = req.body.age;
  let Gender = req.body.gen;
  let Address = req.body.address;
  let City = req.body.city;
  let type = JSON.stringify(req.body.type || []);
  let contact = req.body.contact;
  let IDProof = req.body.idproof;
  let proofno = req.body.proofno;
  let proofurl = req.files ? req.files.proof : null;
  let selfurl = req.files ? req.files.self : null;
  let proofname = "";
  let selfname = "";
  MYSQ.query(
    "select * from Begprofile where emailid=?",
    [Email],
    function (err, resarr) {
      if (resarr.length == 1) {
        proofname = resarr[0].proofurl;
        selfname = resarr[0].selfurl;
      }
    },
  );
  if (req.files) {
    if (proofurl) {
      proofname = proofurl.name;
      let full_path = __dirname + "/upload/" + proofname;
      await proofurl.mv(full_path);
      await cloudinary.uploader.upload(full_path).then(function (result) {
        proofname = result.url;
      });
    }
    if (selfurl) {
      selfname = selfurl.name;
      let full1_path = __dirname + "/upload/" + selfname;
      await selfurl.mv(full1_path);
      await cloudinary.uploader.upload(full1_path).then(function (result) {
        selfname = result.url;
      });
    }
  }
  MYSQ.query(
    "update Begprofile set name=?,age=?,gender=?,address=?,city=?,type=?,contact=?,idproof=?,proofno=?,proofurl=?,selfurl=? where emailid=?",
    [
      Name,
      Age,
      Gender,
      Address,
      City,
      type,
      contact,
      IDProof,
      proofno,
      proofname,
      selfname,
      Email,
    ],
    async function (err, resarr) {
      if (!err) {
        resp.send("Values Saved");
      } else {
        resp.send(err.message);
      }
    },
  );
});

app.get("/chngpass", async function (req, resp) {
  MYSQ.query(
    "select * from credentials where emailid=?",
    [req.query.Email],
    async function (err, resarr) {
      if (err) {
        resp.send(err.message);
        return;
      }

      if (resarr.length == 1) {
        const match = await bcrypt.compare(
          req.query.oldpass,
          resarr[0].password,
        );

        if (match) {
          const newHash = await bcrypt.hash(req.query.newpass, 10);

          MYSQ.query(
            "update credentials set password=? where emailid=?",
            [newHash, req.query.Email],
            function (err) {
              if (!err) {
                resp.send("Updated Successfully");
              } else {
                resp.send(err.message);
              }
            },
          );
        } else {
          resp.send("Wrong Credentials");
        }
      } else {
        resp.send("Invalid Id or Password");
      }
    },
  );
});

app.get("/angularfetchall", function (req, resp) {
  MYSQ.query("select * from credentials", function (err, jsontable) {
    if (!err) {
      resp.send(jsontable);
    } else {
      resp.send(err.message);
    }
  });
});

app.post("/admin-process", function (req, resp) {
  let Email = req.body.Email;
  let pass = req.body.Password;

  MYSQ.query(
    "SELECT * FROM Admincred WHERE emailid=? AND password=?",
    [Email, pass],
    function (err, results) {
      if (err) {
        resp.send(err.message);
        return;
      }

      if (results.length === 1) {
        resp.send("Valid");
      } else {
        resp.send("Wrong");
      }
    },
  );
});

app.get("/fetchvol", function (req, resp) {
  MYSQ.query("select * from Volprofile", function (err, jsonarr) {
    if (!err) {
      resp.send(jsonarr);
    } else {
      resp.send(err.message);
    }
  });
});

app.get("/fetchcitizens", function (req, resp) {
  MYSQ.query("select * from CitizenProfile", function (err, jsonarr) {
    if (!err) {
      resp.send(jsonarr);
    } else {
      resp.send(err.message);
    }
  });
});

app.get("/fetchbeg", function (req, resp) {
  MYSQ.query("select * from Begprofile", function (err, jsonarr) {
    if (!err) {
      resp.send(jsonarr);
    } else {
      resp.send(err.message);
    }
  });
});

app.post("/onblock", function (req, resp) {
  let Email = req.body.Email;
  console.log(Email);
  MYSQ.query(
    "update credentials set status=? where emailid=?",
    [0, Email],
    function (err, jsonarr) {
      if (!err) {
        console.log(jsonarr.affectedRows);
        resp.send(jsonarr);
      } else {
        resp.send(err.message);
      }
    },
  );
});

app.post("/onresume", function (req, resp) {
  console.log(req.body);
  let Email = req.body.Email;
  MYSQ.query(
    "update credentials set status=? where emailid=?",
    [1, Email],
    function (err, jsonarr) {
      if (!err) {
        resp.send(jsonarr);
      } else {
        resp.send(err.message);
      }
    },
  );
});

app.post("/Citizen-Profile", async function (req, resp) {
  let Email = req.body.Email;
  let Mob = req.body.Mob;
  let Name = req.body.Name;
  let Adharno = req.body.Adharno;
  let Fathername = req.body.Fathername;
  let dob = req.body.dob;
  let gen = req.body.gen;
  let add = req.body.Address;
  let city = req.body.city;
  let froadhar = req.files?.froadhar;
  let backadhar = req.files?.backadhar;
  let froadharname = "";
  let backadharname = "";
  if (req.files) {
    if (froadhar) {
      froadharname = froadhar.name;
      let full_path = __dirname + "/upload/" + froadharname;
      await froadhar.mv(full_path);
      await cloudinary.uploader.upload(full_path).then(function (result) {
        froadharname = result.url;
      });
    }
    if (backadhar) {
      backadharname = backadhar.name;
      let full1_path = __dirname + "/upload/" + backadharname;
      await backadhar.mv(full1_path);
      await cloudinary.uploader.upload(full1_path).then(function (result) {
        backadharname = result.url;
      });
    }
  }
  MYSQ.query(
    "INSERT INTO CitizenProfile VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      Email,
      Mob,
      Name,
      Adharno,
      Fathername,
      dob,
      gen,
      add,
      city,
      froadharname,
      backadharname,
    ],
    function (err, result) {
      if (!err) resp.send("Saved");
      else resp.send(err.message);
    },
  );
});

app.get("/angularfetchwork", function (req, resp) {
  MYSQ.query(
    "select distinct type from Begprofile ",
    function (err, tableInJsonArray) {
      resp.send(tableInJsonArray);
    },
  );
});

app.get("/angularfetchcity", function (req, resp) {
  MYSQ.query(
    "select distinct city from Begprofile",
    function (err, tableInJsonArray) {
      resp.send(tableInJsonArray);
    },
  );
});

app.get("/fetchworker", function (req, resp) {
  let work = req.query.type;
  let city = req.query.city;

  MYSQ.query(
    "SELECT * FROM Begprofile WHERE type=? AND city=?",
    [work, city],
    function (err, result) {
      if (err) {
        resp.send(err);
      } else {
        resp.send(result);
      }
    },
  );
});

app.get("/angularfetchBaggers", function (req, resp) {
 
  MYSQ.query("select * from baggers", function (err, tableInJsonArray) {
    if (!err) {
      resp.send(tableInJsonArray);
    } else {
      resp.send(err.message);
    }
  });
});

app.use(express.static(path.join(__dirname, "../dist")));

app.use(function (req, resp) {
  resp.sendFile(path.join(__dirname, "../dist", "index.html"));
});
