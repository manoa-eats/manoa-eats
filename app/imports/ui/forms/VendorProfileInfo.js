import SimpleSchema from 'simpl-schema';
import { VendorProfileValues as DataValues } from '../../api/vendorprofile/VendorProfile';

const VendorProfileInfoSchema = new SimpleSchema({
  name: { label: 'Organization Name', type: String },
  image: { label: 'Profile Image', type: String },
  owner: { label: 'Owner', type: String, optional: true },
  location: { label: 'Location', type: String },
  description: { label: 'Description', type: String, optional: true },
  weekdayOpen: { label: 'Weekdays open', type: Array },
  'weekdayOpen.$': { type: String, allowedValues: DataValues.weekday },
  openHour: { label: 'Hours open', type: Date },
  closeHour: { label: 'Hours closed', type: Date },
  diets: { label: 'Diets', type: Array, optional: true },
  'diets.$': { type: String, allowedValues: DataValues.diet },
});

export { VendorProfileInfoSchema };
