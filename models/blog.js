const { Schema,model } = require("mongoose");

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    CoverImageUrl:{
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",  // Ensure this matches your user model name
    },
},
{ timestamps:true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;