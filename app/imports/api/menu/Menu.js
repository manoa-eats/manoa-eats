import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ContactsCollection. It encapsulates state and variable values for Contacts.
 */
class MenusCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MenusCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      foodName: String,
      owner: String,
      available: Date,
      price: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the MenusCollection.
 * @type {MenusCollection}
 */
export const Menus = new MenusCollection();
