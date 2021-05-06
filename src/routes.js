const express = require("express");
const path = require("path");
const router = express.Router();

const variableToEJS = {
  nome: "Wendel",
  avatar:
    "https://xesque.rocketseat.dev/users/avatar/profile-b41c0883-4320-4cb9-b783-657a934bd04b-1615468743742.jpg",
  cash_per_hour: 70,
};

const jobs = [];

router.get("/", function (req, res) {
    let calcValue = jobs.map(function(item){
    return Number(item['total-hours']) * variableToEJS.cash_per_hour
    })
    console.log(calcValue)
  let calculeDay = jobs.map(function (item) {
      item.status = 'progress' 
    let calculo = Math.round(item["total-hours"] / item["daily-hours"]);
    let date = new Date(item.createdAt);
    let dueYear=  date.getFullYear();
    let dueMonth = date.getMonth();
    let dueDay = date.getDate() + calculo; 
    let dueDate = dueDay - date.getDate();

    console.log(dueDay,dueMonth,dueYear);
    if(date.getDate() > dueDay ||date.getMonth() > dueMonth || date.getFullYear() > dueYear || Number(item['total-hours'])< Number(item['daily-hours'])){
         dueDate = 0
         item.status = 'done'
    }
    return dueDate;
  }); 
  console.log(jobs);
  res.render(path.join(__dirname, "views", "index"), {
    variableToEJS,
    jobs,
    calculeDay,
    calcValue
  });
});

router.get("/index.html", function (req, res) {
  res.redirect("/");
});

router.get("/job", function (req, res) {
  res.render(path.join(__dirname, "views", "job"));
});

router.post("/job", function (req, res) {
  const job = req.body;
  // const jobId = jobs[jobs.length - 1]?.index || 1
  job.index = jobs.length + 1;
  job.createdAt = Date.now();

  jobs.push(job);
  res.redirect("/");
});

router.get("/job-edit", function (req, res) {
  res.render(path.join(__dirname, "views", "job-edit"));
});

router.get("/profile", function (req, res) {
  res.render(path.join(__dirname, "views", "profile"), { variableToEJS });
});

module.exports = router;
