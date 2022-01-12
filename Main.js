const express = require('express')
const app = express()
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))
const dblink = 'mongodb+srv://krepolicious:k3nch1154n@speakable.yl5jd.mongodb.net/raymart?retryWrites=true&w=majority'
const Citizen = require ('./models/citizen')
const Schedule = require('./models/schedule')
const mongoose = require('mongoose')
mongoose.connect(dblink).then(() => {
    app.listen(process.env.PORT)
    console.log("Connected")
})

app.use(express.urlencoded({
    extended: false
}))

app.get('/',(req,res) => {
    res.render('index.ejs')
})

app.get('/fetch-citizen', async (req, res) => {
    await Citizen.find().sort({ Name: 1 }).then(result => {
        res.send(result)
    })
})


app.post('/add-citizen', async (req, res) => {
    const addCitizen = new Citizen({
        Name: req.body.name,
        Age: req.body.age,
        Gender: req.body.gender,
        CivilStatus: req.body.status,
        Zone: req.body.zone,
        Work: req.body.work,
        Income: req.body.income,
        Budget: req.body.budget,
        SocialClass: req.body.class,
        EducationalAttainment: req.body.educational
    })

    await addCitizen.save()

    res.send('Done')
})

app.post('/delete-citizen', async (req, res) => {
    await Citizen.findOneAndDelete({
        Name: req.body.name,
        //Age: req.body.age
    })

    res.send('Done')
})

app.post('/edit-record', async (req, res) => {
    try {
        await Citizen.findOneAndUpdate({
            Name: req.body.currentname},
        {
            Name: req.body.newname,
            Age: req.body.newage,
            Gender: req.body.newgender,
            CivilStatus: req.body.newstatus,
            Zone: req.body.newzone,
            Work: req.body.newwork,
            Income: req.body.newincome,
            Budget: req.body.newbudget,
            SocialClass: req.body.newclass,
            EducationalAttainment: req.body.neweducational
        })
        console.log('Updated')
    } catch (e) {
        console.log(e)
    }

    res.send('')
})


app.get('/visualization', async (req, res) => {
  await Citizen.find({}).sort({ Zone: 1 }).then(result => {
    res.send(result)
  })
})


app.post('/login', async (req, res) => {
  if (req.body.username == 'admin' && req.body.password == 'brgysanjuan') {
    return res.send({ success: true })
  }

  return res.send({ success: false })
})

//financial
app.post('/delete-schedule', async (req, res) => {
    
    await Schedule.findOneAndDelete({
        Zone: req.body.zone,
        Socialclass: req.body.socialclass,
        Scheduledate: req.body.scheduledate,
        Scheduletime: req.body.scheduletime,
        Amount: req.body.amount,
    })

    res.send('Done')
})

app.get('/fetch-schedule', async (req, res) => {
    await Schedule.find().sort({ Zone1: 1 }).then(result => {
        // console.log(result)
        res.send(result)
    })
})

app.post('/add-schedule', async (req, res) => {
    const addSchedule = new Schedule({
        Zone: req.body.zone,
        Socialclass: req.body.socialclass,
        Scheduledate: req.body.scheduledate,
        Scheduletime: req.body.scheduletime,
        Amount: req.body.amount,
       
    })

    await addSchedule.save()

    res.send('Done')
})

app.post('/edit-schedule', async (req, res) => {
    try {
        await Schedule.findOneAndUpdate({
            Zone: req.body.currentzone,
            Scheduledate: req.body.currentdate,
            Scheduletime: req.body.currenttime
        }, {
            Zone: req.body.newzone1,
            Socialclass: req.body.newsocialclass,
            Scheduledate: req.body.newscheduledate,
            Scheduletime: req.body.newscheduletime,
            Amount: req.body.newamount,
           
        })
        console.log('Updated')
    } catch (e) {
        console.log(e)
    }

    res.send('')
})
