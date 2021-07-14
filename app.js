const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json());

app.listen(3000, () => {
})


app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/wiki",
    {useNewUrlParser: true, useUnifiedTopology: true})

const articleSchema = {
    title: String, content: String
}

const Article = mongoose.model("Article", articleSchema)

app.route("/articles")
    .get((req, res) => {
        Article.find((err, found) => {
            if (err) res.send(err)
            res.send(found)
        })
    })
    .post((req, res) => {
        console.log(req.body.title)
        const newArticle = new Article({
            title: req.body.title, content: req.body.content
        })
        newArticle.save((err => {
            if (err) err.send(err)
        }))
    })
    .delete(((req, res) => {
        Article.deleteMany((err => {
            if (err) res.send(err)
            console.log("Deleted successfully")
        }))
    }))