import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addContact(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default Contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}
