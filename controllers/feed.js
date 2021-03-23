var dbConn = require('../config/db.config');
const multer = require('multer');
//const { query } = require("express");


//************Create Funcation for image and Caption **************//

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage : storage}).single("image");




//************* Create ***********//

module.exports.create=(req,res) => {
    upload(req,res,function(err){
        if(err)
        console.log(err.message);
        else
          {
            console.log("File Uploaded");
            const caption = req.body.caption;
            const filepath = req.file.filename;

            var sql = "INSERT INTO feed (image,caption) VALUES ?";
            var values = [[filepath,caption]]
            console.log(filepath);
            console.log(caption);
            dbConn.query(sql,[values],(err, results) => {
                if(err)
                {
                    console.log(err.messsage);
                    res.status(400).json({
                        status: "fails",
                        err:err.message
                    })
                }
                else{
                console.log("Data Successfully Uploaded")

                res.status(200).json({
                    status:"success",
                    data:results
                })
            }
            })
        }
    })
}


//******** View Data  ***********//

exports.viewdata = (req, res) => {
    dbConn.query("Select *from feed" , (err, results) => {
        if(err){
            return console.error(err.messsage);

        }
        console.log(results);
        res.status(200).json({
            success:true,
            message:"Successfully View our data",
            data:results
        });
    });
}



//********* Update Data ***********//

exports.update =(req, res) => {
    let sql ="UPDATE feed SET caption='" +req.body.caption +"' WHERE id=" + req.body.id;
    dbConn.query(sql,(err,results) => {
        if(err) console.log(err.messsage);
        else 
        res.status(200).json({
            success:true,
            message:"success",
            data:results,
        });
    });


};




//******** Delete  ***********//

exports.delete = (req,res) => {
    let sql ="DELETE FROM feed WHERE id=" + req.params.id;
    dbConn.query(sql,(err,results) => {
        if(err) return console.log(err.messsage);
        else 
        res.status(200).json ({
            success:true,
            messsage:"success",
            data:results,
        });
    });
};