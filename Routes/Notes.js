const express = require("express");
const app = express.Router();
const model = require("../database/Notes");
const { body, validationResult } = require("express-validator");
const middle = require("../middlewawre/middle");

app.get("/getNotes", middle, async (req, res) => {
  const note = await model.find({ user: req.user[0]._id });
  res.json(note);
});

app.post(
  "/addNotes",
  [
    body("title", "enter proper title").isLength({ min: 3, max: 30 }),
    body("description", "enter proper description").isLength({
      min: 6,
      max: 80,
    }),
    body("tag", "enter proper tag").isLength({ min: 3, max: 30 }),
  ],
  middle,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    } else {
      const notes = await new model({
        user: req.user[0]._id,
        title,
        description,
        tag,
      });
      const data = notes.save();
      res.json(notes);
    }
  }
);

app.put("/updateNotes/:id", middle, async (req, res) => {
  const note = {};

  const { title, description, tag } = req.body;

  if (title) {
    note.title = title;
  }
  if (description) {
    note.description = description;
  }
  if (tag) {
    note.tag = tag;
  }

  const data = await model.findById(req.params.id);

  if (!data) {
    return res.status(400).json({ error: "element is not here" });
  }

  if (data._id != req.params.id) {
    return res.status(400).json({ error: "id is wrong" });
  }

  const value = await model.findByIdAndUpdate(
    req.params.id,
    { $set: note },
    { new: true }
  );
  res.json(value);
});

app.delete("/deleteNotes/:id", middle, async (req, res) => {
  const data = await model.findById(req.params.id);

  if (!data) {
    return res.status(400).json({ error: "element is not here" });
  }

  if (data._id != req.params.id) {
    return res.status(400).json({ error: "id is wrong" });
  }

  const value = await model.findByIdAndDelete(req.params.id);
  res.json({ success: "deleted successfully", value: value });
});

module.exports = app;
