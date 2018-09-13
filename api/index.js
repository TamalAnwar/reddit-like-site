const router = require('express').Router();
const Post = require('../models/Post');

router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find({})
      .limit(25)
      .sort({ posted: -1 });
    res.send(posts);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/signup', (req, res) => {
  req.session.cookie.username = req.body.username;
  console.log(req.session);
  res.sendStatus(200);
});

router.post('/post', async (req, res) => {
  try {
    res.sendStatus(200);
    const post = new Post(req.body);
    await post.save();
  } catch (error) {
    console.log('Error in here!' + error.message);
    res.sendStatus(403);
  }
});

router.post('/vote', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
      runValidators: true
    });
    // res.sendStatus(200);
    res.json(req.body);
  } catch (error) {
    if (error) {
      console.log(error.message);
    }
    res.sendStatus(404);
  }
});

module.exports = router;
