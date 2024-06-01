import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form className="mx-auto rounded-lg border shadow-lg p-10 min-w-[400px] w-[30vw] text-center">
      <h3 className="text-xl text-center">Shipping</h3>
      <AddressElement
        options={{ mode: "shipping" }}
      />
    </form>
  );
};

export default AddressForm;

//* To prepopulate values pass this to options
// defaultValues: {
//     name: 'Jane Doe',
//     address: {
//       line1: '354 Oyster Point Blvd',
//       line2: '',
//       city: 'South San Francisco',
//       state: 'CA',
//       postal_code: '94080',
//       country: 'US',
//     },
//   },

// * Other options
// mode: 'shipping',
// allowedCountries: ['US'],
// blockPoBox: true,
// fields: {
//   phone: 'always',
// },
// validation: {
//   phone: {
//     required: 'never',
//   },
// },
