const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log(JSON.stringify(books,null,4))
  })

// Get the book list available in the shop
public_users.get('/books',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
 
});

//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromiseISBN = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
myPromiseISBN.then((successMessage) => {
    const isbn = 10;
    console.log(books[isbn])
  })

// Get book details based on ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 
 });

 //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromiseAuth = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
myPromiseAuth.then((successMessage) => {
    const author = "Jane Austen";
    
    const BookAuthor = Object.values(books).filter(book => 
        book.author && book.author.includes(author)
    );

    if (BookAuthor.length > 0) {
        console.log(JSON.stringify(BookAuthor, null, 2));

    } else { 
        console.log("No books found for this author");
    }
  })

// Get book details based on author
public_users.get('/books/author/:author', function (req, res) {
    const author = req.params.author;

    const BookAuthor = Object.values(books).filter(book => 
        book.author && book.author.includes(author)
    );

    if (BookAuthor.length > 0) {
        res.json(BookAuthor); 
    } else { 
        return res.status(404).json({message: "No books found for this author"});
    }
});

 //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
 let myPromiseTitle = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
myPromiseTitle.then((successMessage) => {
    const title = "Fairy tales";
    
    const BookTitle = Object.values(books).filter(book => 
        book.title && book.title.includes(title)
    );

    if (BookTitle.length > 0) {
        console.log(JSON.stringify(BookTitle, null, 2));

    } else { 
        console.log("No books found for this title");
    }
  })

// Get all books based on title
public_users.get('/books/title/:title',function (req, res) {
    //Write your code here
    const title = req.params.title;
  
    const BookTitle = Object.values(books).filter(book => 
          book.title && book.title.includes(title)
      );
      if (BookTitle.length > 0) {
          res.json(BookTitle); 
      } else { 
          return res.status(404).json({message: "No books found for this title"});
      }
  });

//  Get book review
public_users.get('/books/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

      if (books[isbn]) {
          res.json(books[isbn].reviews); 
      } else { 
          return res.status(404).json({message: "No Review found for this Book/ISBN"});
      }
});

module.exports.general = public_users;
