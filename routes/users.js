// Description: This file contains the routes for the users.
// The routes are defined in the userRouter constant.

// Require the express module:
const express = require("express");

// Create an instance of express:
const router = express.Router();

router.use(logUserURL);

// require the dotenv module:
require("dotenv").config();

// console.log(process.env); // Remove this after you've confirmed it is working.

// require the airtable module:
const Airtable = require("airtable");

// Create a new instance of Airtable:
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

// Create a new instance of Airtable for the user data table:
const userDataTable = base(process.env.AIRTABLE_USER_DATA_ID);

// Get Request with Airtable's API syntax:
router.get("/", function (req, res) {
  userDataTable
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        console.log(records); // Records is an array of objects.

        records.forEach(function (record) {
          console.log("Retrieved: ", record.get("Name"));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

  // console.log(req.query.name);
  // res.send("User List");
});

// Basic Get Request for the new user form:
router.get("/new", function (req, res) {
  res.render("New User Form");
});

// Post Request for the new user form:
router.post("/", function (req, res) {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", {
      firstName: req.body.firstName,
    });
  }
  console.log(req.body.firstName);
  res.send("Hi!");
  // res.send("Create New User");
});

// Get Request for the user with ID:
router
  .route("/:id")
  .get(function (req, res) {
    console.log(req.user);
    res.send(`Get User with ID ${req.params.id}`);
  })
  .put(function (req, res) {
    res.send(`Update User with ID ${req.params.id}`);
  })
  .delete(function (req, res) {
    res.send(`Delete User with ID ${req.params.id}`);
  });

// Dummy users data to test the routes before connecting to Airtable:
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Doe Jr" },
];

// Middleware to get the user by ID:
router.param("id", function (req, res, next, id) {
  req.user = users[id];
  next();
});

// router.get("/:id", function (req, res) {
//   res.send(`Get User with ID ${req.params.id}`);
// });

// router.put("/:id", function (req, res) {
//   res.send(`Update User with ID ${req.params.id}`);
// });

// router.delete("/:id", function (req, res) {
//   res.send(`Delete User with ID ${req.params.id}`);
// });

// Middleware to log the user URL:
function logUserURL(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Export the router:
module.exports = router;
