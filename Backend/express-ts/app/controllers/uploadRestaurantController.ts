/**
 * Created by Peter on 14.01.2018.
 */
import { Router, Request, Response } from 'express';
const router: Router = Router();
var multer = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var Jimp = require("jimp");
var upload = multer({ dest: '../../public/images/restaurant/'});

// 'restaurantPicture is the 'name' Property in the frontend p-fileUpload element
router.post('/', upload.array('restaurantPicture',8), function (req, res) {
    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    // var tmp_path = req.file.path;
    req.files.forEach(function(file) {
        /** The original name of the uploaded file
         stored in the variable "originalname". **/
        var tmp_path = file.path;
        var target_path = 'public/images/restaurant/' + file.originalname;
        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        // resize uploaded image
        var thumbnail_width = 100; // 100px = teaserImage width
        var teaser_image_width = 150; // 150px = teaserImage width
        var resize_width = 500; // 500px = resized width
        var thumbnail_path_name: string;
        var teaser_image_path_name: string;
        var resized_path_name: string;
        var image_extension = target_path.substring(target_path.indexOf(".") + 1);
        thumbnail_path_name = target_path.substring(0, target_path.indexOf(".")) + "_thumbnail." + image_extension;
        teaser_image_path_name = target_path.substring(0, target_path.indexOf(".")) + "_teaser." + image_extension;
        resized_path_name = target_path.substring(0, target_path.indexOf(".")) + "_resized." + image_extension;
        dest.on('close', function() {
            Jimp.read(target_path, function (err, image) {
                if (err) throw err;
                image.resize(thumbnail_width, Jimp.AUTO)    // resize
                    .write(thumbnail_path_name); // save
            });

            Jimp.read(target_path, function (err, image) {
                if (err) throw err;
                image.resize(teaser_image_width, Jimp.AUTO)    // resize
                    .write(teaser_image_path_name); // save
            });

            Jimp.read(target_path, function (err, image) {
                if (err) throw err;
                image.resize(resize_width, Jimp.AUTO)    // resize
                    .write(resized_path_name); // save
            });
        });
        // gm(target_path)
        //     .resize(thumbnail_width)
        //     .autoOrient()
        //     .write(thumbnail_path_name, function (err) {
        //         if (!err) console.log(' hooray! ');
        //     });
        // gm(target_path)
        //     .resize(resize_width)
        //     .autoOrient()
        //     .write(resized_path_name, function (err) {
        //         if (!err) console.log(' hooray! ');
        //     });
    });
    res.status(204).end()
});

export const UploadRestaurantController: Router = router;
