const Blog = require("./models/blog")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog.createdBy.equals(req.user._id)) {
        return res.send(" ");
    }
    next();
}