const blogTitleField = document.querySelector(".title");
const articleField = document.querySelector(".article");

// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");

let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener("change", () => {
  uploadImage(uploadInput, "image");
});

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

publishBtn.addEventListener("click", () => {
  if (articleField.value.lenght && blogTitleField.value.lenght) {
    // generating id
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let blog_title = blogTitleField.value.split(" ").join("-");
    let id = "";
    for (let i = 0; i < 4; i++) {
      id += latters[Math.floor(Math.random() * letters.length)];
    }
    // settings up docName
    let doc_name = `${blog_title}-${id}`;
    let data = new Date(); // for published at info

    // acess firestore with db variable;
    db.collection("blogs")
      .doc(doc_name)
      .set({
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath.value,
        publishedAt: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      .then(() => {
        console.log("date entered");
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const form_data = new FormData();
    form_data.append("image", file);

    fetch("/upload", {
      method: "post",
      body: form_data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "image") {
          addImage(data, file.name);
        } else {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      });
  } else {
    alert("upload Image only");
  }
};

const addImage = (imagepath, alt) => {
  let cur_pos = articleField.selectionStart;
  let text_to_insert = `\r![${alt}](${imagepath})\r`;
  articleField.value =
    articleField.value.slice(0, cur_pos) +
    text_to_insert +
    articleField.value.slice(cur_pos);
};
