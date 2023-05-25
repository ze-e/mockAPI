const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const loanSchema = new Schema({
  loanId: {
    type: ObjectId,
    index: { unique: true },
    required: true,
    auto: true,
  },
  borrowers: [
    {
      pairId: {
        type: ObjectId,
        index: { unique: true },
        required: true,
        auto: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Loan", loanSchema);