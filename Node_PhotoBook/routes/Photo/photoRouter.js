var express = require("express");
var router = express.Router();
var path = require("path");
var photoVO = require("../../models/photoBook");

// 파일 업로드를 도와줄 middleware
var multer = require("multer");

var saveFiles = multer.diskStorage({
  destination: (req, file, func) => {
    let photo_dir = path.join(__dirname, "/../../", "public", "images");
    func(null, photo_dir);
  },
  filename: (req, file, func) => {
    // console.log(file.originalname);
    func(null, Date.now() + "_" + file.originalname);
  },
});
var saveFile = multer({ storage: saveFiles }).single("pFile");

router.post("/upload", function (req, res) {
  saveFile(req, res, function (error) {
    if (error) res.send("파일 업로드 오류");
    // multer가 파일을 정상적으로 Upload하고 나면
    // req.file 변수에 값들을 설정(Setting) 해 놓는다.
    // req.file 변수에 있는 속성값들을 가지고 DB저장을 수행
    // if(req.file) : req.file 값이 설정되어 있으면
    if (req.file) {
      // 원본 파일이름
      let originalname = req.file.originalname;
      // multer의 filename에 의해서 변경된 파일이름
      // 실제 업로드 저장된 파일이 된다.
      let photoname = req.file.filename;

      /*
      form에서 업로드한 pText, pTitle은 req.body에 담겨서 여기까지 오고
      multer에 의해 업로드가 된 파일의 정보(원본이름, 변경이름)를
      req.body에 변수를 설정하면서 등록해준다
      */
      req.body.pOriginalName = originalname;
      req.body.pPhotoName = photoname;

      // req.body로 photoVO매개변수에 전달하여 vo를 만들면
      // model에 설정한 값들이 모두 채원진 vo가 만들어진다
      let vo = new photoVO(req.body);
      // vo.save() method만 호출하면 DB에 4개의 변수가 모두
      // 저장이된다.
      vo.save(function (err, data) {
        res.redirect("/");
      });
    }

    // res.send(error);
  });
});

router.get("/upload", function (req, res) {
  res.render("photo/upload");
});

router.get("/", function (req, res) {
  // render() method는 view 파일과 데이터를
  // rendering 하여 web browser에게
  // html로 전송하는 method
  res.render("photo/list");
});

module.exports = router;
