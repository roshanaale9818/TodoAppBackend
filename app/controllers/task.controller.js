
const db = require("../models");
const User = db.user;
const Task = db.task;

// const Op = db.Sequelize.Op;
exports.createTask = (req, res) => {
    User.findOne({
      where: {
        //userId is required
        id: req.body.userId || null
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ status:"error",message: "User Not found." });
        }
        else

        Task.create({
            userId:req.body.userId,
            status:req.body.status,
            name:req.body.name,
            description:req.body.name,
            originText:req.body.originText

          })

      res.send({status:"ok",data:"Successfully created task"})  
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getTasksByUser = (req, res) => {
    User.findOne({
      where: {
        //userId is required
        id: req.body.userId || null
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ status:"error",message: "User Not found." });
        }
        else

        Task.findAll({
            where: {
              userId: req.body.userId
            }
          }).then((task)=>{
            // console.log("this is got in task",task);
            res.send({status:"ok",data:task});
          })

       

    //   res.send({status:"ok",data:"Successfully created Task"})  
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };