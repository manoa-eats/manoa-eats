import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const VendorProfileValues = {
  diet: ['Paleo', 'Vegetarian', 'Vegan', 'Carnivore', 'Gluten-Free'],
};

const VendorProfile = new Mongo.Collection('VendorProfileCollection');

/** Define a schema to specify the structure of each document in the collection. */
const VendorProfileSchema = new SimpleSchema({
  name: String,
  image: String,
  owner: String,
  location: String,
  description: String,
  open: Date,
  openHour: Number,
  close: Date,
  closeHour: Number,
  diets: { type: Array, optional: true },
  'diets.$': { type: String, allowedValues: VendorProfileValues.diet },
}, { tracker: Tracker });

/** Attach the schema to the collection. */
VendorProfile.attachSchema(VendorProfileSchema);

/** Make these objects available to others. */
export { VendorProfileValues, VendorProfile, VendorProfileSchema };
