const mongoose = require('mongoose')

if (process.argv.length < 3) {
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://mwong3a:${password}@fullstack.rx802af.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const addressSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Address = mongoose.model('Address', addressSchema)

//fetch all addresses
if (process.argv.length === 3) {
  Address.find({}).then((result) => {
    result.forEach((address) => {
      console.log(address.name, address.number)
    })
    mongoose.connection.close()
  })
}

//add to address
if (process.argv.length === 5) {
  const address = new Address({
    name: process.argv[3],
    number: process.argv[4],
  })
  address.save().then(() => {
    console.log(`added ${name} number ${number}to phonebook`)
    mongoose.connection.close()
  })
}
