// index.js
const express = require('express')
const cors = require('cors')           // ✅ require cors at top

const app = express()                  // ✅ create app first
app.use(cors())                        // ✅ then use cors

// Parse JSON bodies
app.use(express.json())

// Import week files
const week7 = require('./week7')
app.use('/', week7)

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

