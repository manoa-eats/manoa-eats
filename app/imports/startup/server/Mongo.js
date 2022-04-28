import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { Menus } from '../../api/menu/Menu';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addContact(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
}

function addRestaurant(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  VendorProfile.insert(data);
}

function addMenu(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Menus.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default Contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

if (VendorProfile.find().count() === 0) {
  if (Meteor.settings.defaultRestaurants) {
    console.log('Creating default Restaurants.');
    Meteor.settings.defaultRestaurants.map(data => addRestaurant(data));
  }
}

if (Menus.collection.find().count() === 0) {
  if (Meteor.settings.defaultMenus) {
    console.log('Creating default Menus.');
    Meteor.settings.defaultMenus.map(data => addMenu(data));
  }
}
