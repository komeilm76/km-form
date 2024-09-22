import { z } from 'zod';
import service from '../service';

const packageTemplateStarter = () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
    isMarid: z.boolean(),
    info: z.object({
      power: z.number(),
    }),
  });

  let form = service.form.makeForm(schema, {});

  let values = form.getValues();
  console.log('values', values);
};

export default {
  packageTemplateStarter,
};
