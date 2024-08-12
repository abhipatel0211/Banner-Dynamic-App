import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

app.get("/api/banner", (req, res) => {
  db.query("SELECT * FROM banner WHERE id = 1", (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.status(200).json(result[0]);
  });
});

app.post("/api/banner", (req, res) => {
  // console.log(req.body);
  const { description, date, link, isVisible } = req.body;
  db.query(
    "UPDATE banner SET description = ?, date = ?, link = ?, is_visible = ? WHERE id = 1",
    [description, date, link, isVisible],
    (err) => {
      if (err) throw err;
      const currentDate = new Date();
      res
        .status(200)
        .json(
          currentDate > date
            ? "Banner not visible as date is expired"
            : "Banner updated successfully"
        );
    }
    // console.log(res);
  );
});

app.post("/api/visibility", (req, res) => {
  // console.log(req.body);
  const { visible } = req.body;
  db.query(
    "UPDATE banner SET is_visible = ? WHERE id = 1",
    [visible],
    (err) => {
      if (err) throw err;
      res.status(200).json("Visibility updated successfully");
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
