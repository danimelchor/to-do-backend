const { Router } = require("express");
const router = Router();

const Tab = require("../database/models/Tab");

// TESTING IF AUTHENTICATED
router.get("/whoami", (req, res) => {
  res.status(200).json({ user: req.user });
});

// GET ALL TABS
router.get("/", (req, res) => {
  Tab.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ ok: false, error: "Can't find tabs" });
    });
});

// CREATE A NEW TAB
router.post("/tab", async (req, res) => {
  const { title } = req.body;

  const tab = new Tab({ title: title });
  tab
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, error: "Please choose a valid title." });
    });
});

// EDIT TAB NAME
router.put("/tab", async (req, res) => {
  const { tabId, title } = req.body;

  Tab.updateOne(
    { _id: tabId },
    {
      $set: { title },
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, error: "Please choose a valid tab and name." });
    });
});

// DELETE A TAB
router.delete("/tab", async (req, res) => {
  const { tabId } = req.body;
  console.log(tabId);

  Tab.deleteOne({ _id: tabId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, error: "Please choose a valid title." });
    });
});

// CREATE A NEW TASK
router.post("/task", (req, res) => {
  const { taskName, tabId } = req.body;

  Tab.updateOne(
    { _id: tabId },
    {
      $push: { tasks: { name: taskName } },
    },
    { new: true, upsert: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, error: "Please choose a valid tab and name." });
    });
});

// COMPLETE A NEW TASK
router.put("/task", (req, res) => {
  const { taskId, tabId, completed } = req.body;

  Tab.updateOne(
    { _id: tabId, "tasks._id": taskId },
    {
      $set: { "tasks.$.completed": completed },
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, error: "Please choose a valid tab and name." });
    });
});

module.exports = router;
