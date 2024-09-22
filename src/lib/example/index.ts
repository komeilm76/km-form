import { z } from 'zod';
import service from '../service';

const packageTemplateStarter = () => {
  const schema = z.object({
    body: z.object({
      docId: z.number(),
      description: z.string(),
      docDate: z.date(),
      issuer: z.string(),
      items: z
        .object({
          item: z.number(),
          auxacctId: z.number(),
          detacctId: z.number(),
          amount: z.number(),
          exchg: z.string(),
          bankId: z.number(),
          exchgRate: z.number(),
          exchgAmnt: z.number(),
          descp: z.string(),
          ddd: z.object({
            name: z.string(),
          }),
        })
        .array(),
      info: z.object({
        email: z.string().email(),
      }),
    }),
  });

  let form = service.form.makeForm(schema.shape.body, {});
  form.setValues({
    docId: 12,
    docDate: new Date(),
    description: 'salam',
    issuer: 'ssss',
    items: [
      { amount: 12 },
      { auxacctId: 23 },
      { ddd: { name: 'gggggggggggg' } },
    ],
    info: {
      email: 'komeil@gmail.com',
    },
  });

  // let values = form.getValues();
  // let testSchemas = [
  //   z.number(),
  //   z.bigint(),
  //   z.string(),
  //   z.any(),
  //   z.never(),
  //   z.unknown(),
  //   z.void(),
  //   z.boolean(),
  //   z.date(),
  //   z.symbol(),
  //   z.literal('sss'),
  //   z.union([z.literal('dd'), z.literal('rrr')]),
  //   z.tuple([z.literal('dd'), z.literal('rrr')]),
  //   z.object({}),
  //   z.array(z.string()),
  //   z.optional(z.string()),
  //   z.nullable(z.string()),
  //   z.null(),
  //   z.undefined(),
  // ];
  // testSchemas.forEach((item) => {
  //   console.log(item._def.typeName);
  // });
};

export default {
  packageTemplateStarter,
};
