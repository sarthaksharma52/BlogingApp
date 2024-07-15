# Blogging App

A feature-rich blogging platform built using Node.js, Express, and EJS, with MongoDB as the database. This app allows users to post blogs, comment on posts, and upload profile images.

## Features

- **User Authentication**: Sign up and log in to create and manage blog posts.
- **Create/Edit/Delete Blogs**: Users can create, edit, and delete their own blog posts.
- **Comment on Blogs**: Viewers can comment on blog posts.
- **Upload Profile Image**: Users can upload and update their profile pictures.
- **Responsive Design**: The app is designed to be responsive and user-friendly across various devices.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Database**: MongoDB
- **Storage**: Multer (for handling file uploads)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/blogging-app.git
    cd blogging-app
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=your_secret_key
    ```

4. **Start the server**:
    ```sh
    npm start
    ```
    The app should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up/Log In**: Create an account or log in with existing credentials.
2. **Create a Blog Post**: Once logged in, navigate to the "New Post" page to create a blog post.
3. **Comment on a Post**: View a blog post and add comments.
4. **Upload Profile Image**: Go to your profile page to upload or update your profile image.

## File Structure

```plaintext
blogging-app/
├── public/               # Static files (CSS, images, etc.)
├── routes/               # Express route handlers
│   ├── index.js
│   ├── users.js
│   └── posts.js
├── views/                # EJS templates
│   ├── partials/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── new-post.ejs
│   ├── edit-post.ejs
│   └── post.ejs
├── models/               # Mongoose models
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── .env                  # Environment variables
├── app.js                # Express app setup
├── package.json          # NPM dependencies and scripts
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- **Node.js**: https://nodejs.org/
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://www.mongodb.com/
- **EJS**: https://ejs.co/
- **Multer**: https://github.com/expressjs/multer
