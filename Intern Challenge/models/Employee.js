//Previous project sample code for in input validations

/*


const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema(
    {
          id:{
            type: Number,
            required: true,
            unique: true
          },
          firstName: {
            type: String,
            required: [true, "Enter first name"],
          },
          lastName: {
            type: String,
            required: [true, "enter last name"],
          },
          email: {
            type: String,
            required: [true, "Enter email"],
            unique: true
          },
          premiumMembership: {
            type: Boolean,
            required: true
          }
    },
    {
        timestamps: true
    }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
*/