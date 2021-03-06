/**
 * Created by Peter on 28.01.2018.
 */
import { Router, Request, Response } from 'express';
const router: Router = Router();
var multer = require('multer');
var fs = require('fs');
var Jimp = require("jimp");
var upload = multer({ dest: '../../public/images/meal/'});

// 'mealPicture is the 'name' Property in the frontend p-fileUpload element
router.post('/', upload.single('mealThumbnail'), function (req, res) {
    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    /** The original name of the uploaded file
     stored in the variable "originalname". **/
    var tmp_path = req.file.path;
    var target_path = 'public/images/meal/' + req.file.originalname;
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    // resize uploaded image
    var thumbnail_width = 100; // 100px = teaserImage width
    var resize_width = 500; // 500px = resized width
    var thumbnail_path_name: string;
    var resized_path_name: string;
    var thumbnail_extension = target_path.substring(target_path.indexOf(".") + 1);
    thumbnail_path_name = target_path.substring(0, target_path.indexOf(".")) + "_thumbnail." + thumbnail_extension;
    dest.on('close', function() {
        Jimp.read(target_path, function (err, image) {
            if (err) throw err;
            image.resize(thumbnail_width, Jimp.AUTO)    // resize
                .write(thumbnail_path_name); // save
        });
    });
    res.status(204).end()
});

export const UploadMealController: Router = router;
