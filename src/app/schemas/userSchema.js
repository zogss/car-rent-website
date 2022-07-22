import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  wallet: Yup.string().required(),
  password: Yup.string().min(8).required(),
  password_confirmation: Yup.string()
    .required()
    .min(8)
    .oneOf([Yup.ref("password"), null]),
});

export default schema;
