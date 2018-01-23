/**
 * Created by Peter on 14.01.2018.
 */
import { Router, Request, Response } from 'express';
const router: Router = Router();
var multer = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });


// router.post('/', function(req, res, next) {
//     console.log(req);
//     res.status(204).end();
// })
var upload = multer({ dest: '../../public/images/'});
// D:\RestBook\Backend\express-ts\app\images

// 'restaurantPicture is the 'name' Property in the frontend p-fileUpload element
router.post('/', upload.array('restaurantPicture',8), function (req, res) {
    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    // var tmp_path = req.file.path;
    req.files.forEach(function(file) {
        /** The original name of the uploaded file
         stored in the variable "originalname". **/
        var tmp_path = file.path;
        var target_path = 'public/images/' + file.originalname;
        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        // resize uploaded image
        var thumbnail_width = 100; // 100px = thumbnail width
        var resize_width = 500; // 500px = resized width
        var thumbnail_path_name: string;
        var resized_path_name: string;
        var thumbnail_extension = target_path.substring(target_path.indexOf(".") + 1);
        thumbnail_path_name = target_path.substring(0, target_path.indexOf(".")) + "_thumbnail." + thumbnail_extension;
        resized_path_name = target_path.substring(0, target_path.indexOf(".")) + "_resized." + thumbnail_extension;
        gm(target_path)
            .resize(thumbnail_width)
            .autoOrient()
            .write(thumbnail_path_name, function (err) {
                if (!err) console.log(' hooray! ');
            });
        gm(target_path)
            .resize(resize_width)
            .autoOrient()
            .write(resized_path_name, function (err) {
                if (!err) console.log(' hooray! ');
            });
    });
    res.status(204).end()
});

export const UploadController: Router = router;
