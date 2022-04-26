import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const Menu = new Mongo.Collection('MenuCollection');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  name: String,
  owner: String,
  foodName: String,
  dateAvailable: Date,
  timeAvailable: Number,
  price: Number,
}, { tracker: Tracker });

/** Attach the schema to the collection. */
Menu.attachSchema(MenuSchema);

/** Make these objects available to others. */
export { Menu, MenuSchema };
