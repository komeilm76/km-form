import { z } from 'zod';
import lib from './lib';

const kmForm = lib;
kmForm.example.packageTemplateStarter();
export default kmForm;

// let schema = z.string().default('salam');

// console.log('schema', schema);

// let form = kmForm.service.form.makeForm(
//   z.object({
//     name: z.string(),
//     tags: z.object({ key: z.string(), value: z.string() }).array(),
//   }),
//   {}
// );
// form.shape.tags[0].value;
// console.log('form.shape.name', form.shape);

// ----------------
// move to km-zod =>

// const schema = z.string().or(z.null());

// class KMValue {
//   constructor(value: any) {}
//   value() {
//     return this.value;
//   }
// }

// const kmSChema = z.instanceof(KMValue);

// type IShape<SCHEMA extends ZodTypeAny, META extends AnyZodObject> = {
//   [key in keyof META]: META[key] extends KMValue ? z.infer<SCHEMA> : META[key];
// };

// const shape = <
//   SCHEMA extends ZodType,
//   KEY extends string,
//   META extends ZodObject<{
//     [key in KEY]: SCHEMA;
//   }>
// >(
//   schema: SCHEMA,
//   key: KEY,
//   meta: META
// ) => {
//   meta.shape[key] = schema;

//   return meta as META & ZodObject<{ [key in KEY]: SCHEMA }>;
// };

// let shapedSchema = shape(
//   z.number(),
//   'value',
//   z.object({
//     value: z.number(),
//     loading: z.boolean(),
//   })
// );
// ----------------

let schema = z.object({
  id: z.string().nullable(),
  buyerName: z.string().nullable(),
  productId: z.number().nullable(),
  qty: z.number().optional(),
  countryCode: z.number(),
  cityCode: z.number(),
  regUser: z.string(),
  regDate: z.date().optional(),
  tenderId: z.number(),
  descp: z.string(),
  price: z.string(),
  delivery: z.string(),
  payment: z.string(),
  shipmentId: z.number(),
  cancel: z.string(),
  piDate: z.date(),
  buyerId: z.number(),
  telorance: z.number(),
  packCode: z.number(),
  bankId: z.number(),
  loadingPort: z.string(),
  deliveryTime: z.string(),
  cargoOrigin: z.string(),
  priceValidity: z.date(),
  descpOnPi: z.string(),
  bookingNo: z.string(),
  laycanFrom: z.date(),
  laycanTo: z.date(),
  attn: z.string(),
  agentId: z.string(),
  letterHeader: z.string(),
  quality: z.string(),
  insurance: z.string(),
  incoterm: z.string(),
  shipmentTime: z.string(),
  numberPort: z.string(),
  numberBerth: z.string(),
  sellerId: z.number(),
  vessel: z.string(),
  priceFormula: z.string(),
  unitPrice: z.number(),
  exchangeCode: z.string(),
  inspector: z.string(),
  productDescp: z.string(),
  destCityDescp: z.string(),
  piSubject: z.string(),
  carryType: z.string(),
  agentConfirm: z.string(),
  agentConfirmUser: z.string(),
  purchaseExportId: z.number(),
  days: z.number(),
  payType: z.string(),
  provPrice: z.number(),
  complexId: z.string(),
  formulaNo: z.string(),
  freight: z.number(),
});

let v2Form = kmForm.service.form.v2.makeForm(schema, {});
console.log('v2Form:Shape', v2Form.shape.id.content.value);
