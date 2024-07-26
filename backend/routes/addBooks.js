const mongoose = require("mongoose");
const Book = require("../models/Book");

mongoose
  .connect("mongodb://127.0.0.1:27017/BookReview_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const books = [
      {
        name: "Book 1",
        imageUrl: "assets/1.png",
        rating: 4.5,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
      {
        name: "Book 2",
        imageUrl: "assets/2.png",
        rating: 4.0,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
      {
        name: "Book 3",
        imageUrl: "assets/3.png",
        rating: 4.0,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
      {
        name: "Book 1",
        imageUrl: "assets/1.png",
        rating: 4.5,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
      {
        name: "Book 2",
        imageUrl: "assets/2.png",
        rating: 4.0,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
      {
        name: "Book 3",
        imageUrl: "assets/3.png",
        rating: 4.0,
        authorname: "nomi",
        description: "djsfhkljhdfkljasdhfkljhsdfkljhds",
        link: "https://www.amazon.com/Purrfect-Cruise-Mysteries-Max-Saint/dp/B08Y49J2DN",
      },
    ];

    Book.deleteMany()
      .then(() => {
        console.log("delete");
      })
      .then(() => {
        Book.insertMany(books)
          .then(() => {
            console.log("Books added successfully");
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error("Error adding books:", err);
            mongoose.connection.close();
          });
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
