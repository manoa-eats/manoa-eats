import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { UserProfileValues } from "../userprofile/UserProfile";

/** Define a Mongo collection to hold the data. */
const UserDiet = new Mongo.Collection('UserDietColl');

/** Define a schema to specify the structure of each document in the collection. */
const UserDietSchema = new SimpleSchema({
    diets: Array,
    'diets.$': { type: String, allowedValues: UserProfileValues.diet },
}, { tracker: Tracker });

/** Attach the schema to the collection. */
UserDiet.attachSchema(UserDietSchema);

/** Make these objects available to others. */
export { UserDiet, UserDietSchema };