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
        })
        .array(),
    }),
  });

  let form = service.form.makeForm(schema.shape.body, {});
  console.log('form', form);

  let values = form.getValues();
  console.log('values', values);
};

export default {
  packageTemplateStarter,
};
