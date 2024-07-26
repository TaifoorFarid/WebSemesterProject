const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    role: String,
    additionalInfo: String,
    link: String,
    

})
FormDataSchema.statics.findByName = function(name) {
    return this.findOne({ name });
};

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
