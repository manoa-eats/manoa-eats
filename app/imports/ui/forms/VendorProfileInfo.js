import SimpleSchema from 'simpl-schema';
import { VendorProfileValues as DataValues } from '../../api/vendorprofile/VendorProfile';

const VendorProfileInfoSchema = new SimpleSchema({
  name: { label: 'Organization Name', type: String },
  image: { label: 'Profile Image', type: String },
  owner: { label: 'Owner', type: String },
  location: { label: 'Location', type: String },
  description: { label: 'Description', type: String },
  open: { label: 'Date opened', type: Date },
  openHour: { label: 'Hours open', type: Number },
  close: { label: 'Date open', type: Date },
  closeHour: { label: 'Hours closed', type: Number },
  diets: { label: 'Diets', type: Array, optional: true },
  'diets.$': { type: String, allowedValues: DataValues.diet },
});

export { VendorProfileInfoSchema };
