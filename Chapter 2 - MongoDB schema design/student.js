var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: String, ref: 'Course' }]
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

/* Returns the student's first name, which we will define
 * to be everything up to the first space in the student's name.
 * For instance, "William Bruce Bailey" -> "William" */
schema.virtual('firstName').get(function() {
    return this.name.substr(0, this.name.indexOf(' '));
});

/* Returns the student's last name, which we will define
 * to be everything after the last space in the student's name.
 * For instance, "William Bruce Bailey" -> "Bailey" */
schema.virtual('lastName').get(function() {
  /** Regex Explnation
  * $ Asserts the position at the end of the string
  * [^ ]* matches characters that are not space until the end of string because
  of the * after the closing bracket
  * ?= is used to exclude the whitespace character
  */
  const re = this.name.search(/(?=[^ ]*$)/);
  return this.name.substr(re);
});

module.exports = schema;
