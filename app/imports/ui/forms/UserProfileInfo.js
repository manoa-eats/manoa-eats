import SimpleSchema from 'simpl-schema';
import { UserProfileValues as DataValues } from '../../api/userprofile/UserProfile';


const UserProfileInfoSchema = new SimpleSchema({
    name: { label: 'Name', type: String },
    image: { label: 'Profile Picture', type: String }, 
    userPreferredFoods: { label: 'Foods', type: Array, optional: true },
    'userPreferredFoods.$': { type: String, allowedValues: DataValues.food },
    diets: { label: 'Diets', type: Array, optional: true },
    'diets.$': { type: String, allowedValues: DataValues.diet },
});

export { UserProfileInfoSchema };