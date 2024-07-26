const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const booksRouter = require("./routes/books");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(express.json());

app.use(
  cors({
    // credentials: true
  })
);

const port = 8000;
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/BookReview_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/books", booksRouter);
app.use("/api/reviews", reviewRoutes); // Prefix with /api for consistency

// Authentication routes
app.post("/register", (req, res) => {
  const { email, password, role } = req.body; // Get role from request body
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create({ ...req.body, role }) // Save the role in the user data
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password, role } = req.body; // Get role from request body
  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password && user.role === role) {
          // Check if the role matches
          res.json({
            user: { name: user.name, email: user.email, role: user.role },
          });
        } else {
          res.json({ message: "Wrong password or role" });
        }
      } else {
        res.json({ message: "No records found!" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// app.post('/api/contact', async (req, res) => {
//     const { firstName, lastName, email, description } = req.body;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: '', //your Email

//             pass: 'dsfdsafasdfads', //Your Email App Password this is the example like this
//         },
//     });

//     const mailOptions = {
//         from: email,
//         to: '', //your Email
//         subject: 'Review From Book Webiste',
//         text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nDescription: ${description}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).send('Message sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send(`Failed to send message: ${error.message}`);
//     }
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
