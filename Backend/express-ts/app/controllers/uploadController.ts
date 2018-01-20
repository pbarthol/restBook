/**
 * Created by Peter on 14.01.2018.
 */
import { Router, Request, Response } from 'express';
const router: Router = Router();
var multer = require('multer');
var fs = require('fs');


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
    });

    res.status(204).end()
});


// function addUploadRecord(req, res){
//     let upload = new Upload();
//     upload.originalname = req.file.originalname;
//     upload.storagename = req.file.path;
//     upload.save(function (err, upload) {
//         if (err) {
//             console.error(err);
//             return res.send(err);
//         }
//         // return res.send(upload.toJSON());
//     });
// }


export const UploadController: Router = router;
