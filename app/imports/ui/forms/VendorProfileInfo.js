import SimpleSchema from 'simpl-schema';
import { VendorProfileValues as DataValues } from '../../api/vendorprofile/VendorProfile';

const VendorProfileInfoSchema = new SimpleSchema({
  name: { label: 'Organization Name', type: String, optional: true },
  image: { label: 'Profile Image', type: String, optional: true },
  owner: { label: 'Owner', type: String, optional: true },
  location: { label: 'Location', type: String, optional: true },
  description: { label: 'Description', type: String, optional: true },
  weekdayOpen: { label: 'Weekdays open', type: Array, optional: true },
  'weekdayOpen.$': { type: String, allowedValues: DataValues.weekday },
  openHour: { label: 'Hours open', type: Date, optional: true },
  closeHour: { label: 'Hours closed', type: Date, optional: true },
  diets: { label: 'Diets', type: Array, optional: true },
  'diets.$': { type: String, allowedValues: DataValues.diet },
});

export { VendorProfileInfoSchema };
