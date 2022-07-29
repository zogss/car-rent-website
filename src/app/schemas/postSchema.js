import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required(),
  model: Yup.string().required(),
  brand: Yup.string().required(),
  year: Yup.number().required(),
  valuePerDay: Yup.string().required(),
  plate: Yup.string().required(),
  size: Yup.string().required(),
  maxSpeed: Yup.number().required(),
  fileName: Yup.string(),
  fileSize: Yup.number(),
  key: Yup.string(),
});

export default schema;
