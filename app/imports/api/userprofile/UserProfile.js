import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const UserProfileValues = {
  food: ['burger', 'pizza', 'bento', 'fries'],
  diet: ['Paleo', 'Vegetarian', 'Vegan', 'Carnivore', 'Gluten-Free'],
};

const UserProfile = new Mongo.Collection('UserProfileCollection');

/** Define a schema to specify the structure of each document in the collection. */
const UserProfileSchema = new SimpleSchema({
  name: String,
  image: String,
  owner: String,
  userPreferredFoods: { type: Array, optional: true },
  'userPreferredFoods.$': { type: String, allowedValues: UserProfileValues.food },
  diets: { type: Array, optional: true },
  'diets.$': { type: String, allowedValues: UserProfileValues.diet },
}, { tracker: Tracker });

/** Attach the schema to the collection. */
UserProfile.attachSchema(UserProfileSchema);

/** Make these objects available to others. */
export { UserProfileValues, UserProfile, UserProfileSchema };
