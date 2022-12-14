const express = require('express')
//const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*router.get('/', (req, res) => (
    res.render('authors/index')
))*/

//All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
    res.render('authors/new' )
})

/*router.post('/', urlencodedParser, (req, res) => {
    const author = new Author({
        name: req.body.name
      })
      author.save((err, newAuthor) => {
        if(err) {
            res.render('authors.new', {
                author: author,
                errorMessage: 'Error creating Author'
            })
        } else {
            //res.redirect
            res.redirect('authors')
        }
      })
    //res.send(req.body)
}) 
*/

// Create Author Route
router.post('/', urlencodedParser,async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      res.send(req.body)
     // res.redirect(`authors/${newAuthor.id}`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })



module.exports = router