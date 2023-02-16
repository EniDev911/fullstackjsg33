const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.static(initial_path));
app.use(fileupload());

app.get("/home", (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});

app.get("/editor", (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

// upload link
app.post("/upload", (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // Image name
  let image_name = date.getDate() + date.getTime() + file.name;
  // Image upload path
  let path = "public/uploads/" + image_name;
  // create upload
  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      // our image upload path
      res.json(`uploads/${image_name}`);
    }
  });
});
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
