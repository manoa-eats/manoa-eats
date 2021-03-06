import SimpleSchema from 'simpl-schema';

const MenuProfileInfoSchema = new SimpleSchema({
  foodName: { label: 'Name', type: String },
  owner: { label: 'owner', type: String, optional: true },
  price: { label: 'price', type: Number },
});

export { MenuProfileInfoSchema };
