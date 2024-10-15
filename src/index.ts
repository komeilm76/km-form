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
