import { z } from 'zod';
import service from '../service';

const packageTemplateStarter = () => {
  console.log('example is runed');

  let schema = z.object({
    name: z.string(),
    age: z.number(),
  });
  const form = service.form.v1.makeForm(schema, {});
  form.isValid.subscribe(() => {
    console.log('form.isValid', form.isValid);
  });
  form.setValues({ age: 12 });
};

export default {
  packageTemplateStarter,
};
