import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { UserProfile } from '../../api/userprofile/UserProfile';
import { UserDiet } from '../../api/userdiet/UserDiet';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { Menus } from '../../api/menu/Menu';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Reviews.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Menus.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Menus.collection.find({ owner: username });
  }
  return this.ready();
});
Meteor.publish(Restaurants.userPublicationName, function () {
  return Restaurants.collection.find();
});

Meteor.publish('UserProfile', function publishStudentData() {
  return UserProfile.find();
});

Meteor.publish('UserDiet', function publishEnrollmentData() {
  return UserDiet.find();
});

Meteor.publish('VendorProfile', function publishVendorData() {
  return VendorProfile.find();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Restaurants.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Restaurants.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reviews.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
