const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const checkPhonenumber = [
  {
    validator: function (v) {
      return /\d{2,3}-\d{7,}/.test(v)
    },
    message: (props) =>
      `${props.value} is not in the right format DD-DDDDDDDD or DDD-DDDDDDD!`,
  },
  {
    validator: function (v) {
      return /[0-9]+(-[0-9]+)/.test(v)
    },
    message: (props) => `${props.value} - please make sure there is one hypen`,
  },
  {
    validator: function (v) {
      return /[0-9-]/.test(v)
    },
    message: (props) => `${props.value} - Make sure there are only numbers`,
  },
]

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Must be at least 3 letters, instead got {VALUE}'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: [8, 'Must be at least 8 numbers, instead got {VALUE}'],
    validate: checkPhonenumber,
    required: [true, 'Phonenumber is required'],
  },
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
