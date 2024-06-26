const postmodel = require("../models/postmodel");

class PostController {
  async getAll(req, res) {
    try {
      const AllPosts = await postmodel.find();
      res.status(200).send("hello world");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async create(req, res) {
    try {
      const { title } = req.body;
      const newPost = await postmodel.create({ title });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new PostController();
