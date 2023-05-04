import {  mixed, object, string } from "yup";

export const schema = object().shape({
  name: string().required("Nmae is required"),
  description: string().required("Description is required"),
})