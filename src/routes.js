const express = require("express");
const path = require("path");
const router = express.Router();

const profile = {
  nome: "Wendel",
  avatar:
    "https://xesque.rocketseat.dev/users/avatar/profile-b41c0883-4320-4cb9-b783-657a934bd04b-1615468743742.jpg",
    "monthly-budget": '1200',
    "days-per-week":'4',
    "hours-per-day":'6',
    "vacation-per-year":'4',
  cash_per_hour: '60',
};

let param;
const app = {
  controller: {
    index:function (req, res) {
      let calcValue = jobs.map(function(item){
      return Number(item['total-hours']) * profile.cash_per_hour
      })
    let calculeDay = jobs.map(function (item) {
        item.status = 'progress' 
      let calculo = Math.round(item["total-hours"] / item["daily-hours"]);
      let date = new Date(item.createdAt);
      let dueYear=  date.getFullYear();
      let dueMonth = date.getMonth();
      let dueDay = date.getDate() + calculo; 
      let dueDate = dueDay - date.getDate();
  
      // console.log(dueDay,dueMonth,dueYear);
      if(date.getDate() > dueDay ||date.getMonth() > dueMonth || date.getFullYear() > dueYear || Number(item['total-hours'])< Number(item['daily-hours'])){
           dueDate = 0
           item.status = 'done'
      }
      return dueDate;
    }); 
    res.render(path.join(__dirname, "views", "index"), {
      profile,
      jobs,
      calculeDay,
      calcValue
    });
  },
  redirectIndex:function (req, res) {
    res.redirect("/");
  },
  getJob:function (req, res) {
    res.render(path.join(__dirname, "views", "job"));
  },
  postjob: function (req, res) {
    if(profile.cash_per_hour == ''){
      
    }else{
      const job = req.body;
      // const id = jobs[jobs.length - 1]?.index || 1
      job.index = jobs.length + 1;
      job.createdAt = Date.now();
    
      jobs.push(job); 
      res.redirect("/");
    }
    
  },
  "edit-job":function (req, res) {
    function show(){
      let jobId = req.params.id
      param = jobId
      let realIndex = Number(jobId) -1
      let calcValue = jobs.map(function(item){
        return Number(item['total-hours']) * profile.cash_per_hour
        })
    

  let theJob = jobs[realIndex]
  console.log(`jobId = ${jobId} e realIndex = ${realIndex}`)

    if(theJob.index == jobId){
      console.log(theJob)
    return res.render(path.join(__dirname, "views", "job-edit"),{theJob,calcValue});
    }else{
      return res.send('job not found')
    }
    
    }
    
show();
  },
  "post-edit":function(req,res){
  
    const postedData = req.body
    console.log(jobs[Number(param - 1)])

   jobs[Number(param - 1)].name = postedData.name
   jobs[Number(param - 1)]['daily-hours'] = postedData['daily-hours']
   jobs[Number(param - 1)]['total-hours'] = postedData['total-hours']
  
    return res.redirect('/')
  },
  "delete-job":function(req,res){
    let theParam = req.params.id

    // function removeItem(arr,item){
    //   return arr.filter(function(ele){
    //     return ele != item
    //   });
    //   }

    function removeByIndex(array,index){
      let arrInit = array.splice(0,index)
      let arr2 = array.splice(1)
      
      arr2.forEach(function(item){
          return arrInit.push(item)
      })
        
      return arrInit
  }
      
      jobs = removeByIndex(jobs,(theParam - 1))
      jobs.forEach(function(item){ 

        if(theParam > item.index){}else if(theParam <= item.index){
          let calcIndex = theParam - item.index
          item.index = (theParam - 1)- calcIndex
        }
        
      })
       
       
      
      
      return res.redirect("/")
  },
  profile:function (req, res) {
    res.render(path.join(__dirname, "views", "profile"), { profile });
  },
  saveProfile: function(req,res){
   const data = req.body
  

    const weeksPerYear = 52
    const weeksPerMonth = ((weeksPerYear - data["vacation-per-year"]) / 12)
    const weekTotalHours = data["days-per-week"] * data["hours-per-day"] 
    const monthTotalHours = weekTotalHours * weeksPerMonth
    profile["monthly-budget"] = data["monthly-budget"]
    profile["vacation-per-year"] = data["vacation-per-year"]
    profile["hours-per-day"] = data["hours-per-day"]
    profile["days-per-week"] = data["days-per-week"]
    profile.cash_per_hour = Number(Number(data['monthly-budget'] / monthTotalHours)).toFixed()

    return res.redirect('/profile')
  }
  }
}
let jobs = [];

router.get("/", app.controller.index);
router.get("/index.html", app.controller.redirectIndex);
router.get("/job", app.controller.getJob);
router.post("/job",app.controller.postjob);
router.get("/job/:id", app.controller["edit-job"]); 
router.post("/job-edit", app.controller["post-edit"]);
router.post("/job/delete/:id", app.controller["delete-job"]);
router.get("/profile", app.controller.profile);
router.post("/profile", app.controller.saveProfile);


module.exports = router;
