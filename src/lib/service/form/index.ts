import {
  AnyZodObject,
  z,
  ZodArray,
  ZodBoolean,
  ZodNumber,
  ZodString,
  ZodTypeAny,
} from 'zod';

import _ from 'lodash';
import { ref } from 'km-fresh';

const addDescriptionToSchema = <SCHEMA extends AnyZodObject>(
  schema: SCHEMA,
  description: string | undefined
) => {
  let describedSchema = schema.describe(
    description || 'Description Is Not Exist'
  );
  return describedSchema;
};

const makeDefaultValueBySchema = (schemaValue: any) => {
  let initialValue = undefined;
  if (schemaValue instanceof ZodString) {
    initialValue = '';
  } else if (schemaValue instanceof ZodNumber) {
    initialValue = 0;
  } else if (schemaValue instanceof ZodBoolean) {
    initialValue = false;
  }
  return initialValue;
};

type IStringShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<string>>;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};
type INumberShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<number>>;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};
type IBooleanShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<boolean>>;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};

type IObjectShape<SCHEMA extends AnyZodObject = AnyZodObject> = {
  mode: 'parent';
} & {
  [key in keyof SCHEMA['shape']]: SCHEMA['shape'][key] extends ZodString
    ? IStringShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodNumber
    ? INumberShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodBoolean
    ? IBooleanShape<SCHEMA['shape'][key]>
    : undefined;
};

type IArrayShape<
  SCHEMA extends ZodArray<AnyZodObject> = ZodArray<AnyZodObject>
> = {
  [key in keyof SCHEMA['element']['shape']]: SCHEMA['element']['shape'][key] extends ZodString
    ? IStringShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodNumber
    ? INumberShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodBoolean
    ? IBooleanShape<SCHEMA['element']['shape'][key]>
    : undefined;
}[];

const makeFieldShape = (key: string, schema: ZodTypeAny) => {
  let v = makeDefaultValueBySchema(schema);
  return {
    mode: 'field',
    title: _.startCase(key),
    key: key,
    content: ref(v),
    schema: schema,
    errors: ref([]),
  };
};

const makeFieldBySchema = (key: string, schema: ZodTypeAny) => {
  let mode: 'parent' | 'field' = 'parent';
  if (schema._def.typeName == 'ZodObject') {
    let _schema = schema as AnyZodObject;
    return makeShapeBySchema(_schema, mode);
  }
  if (schema._def.typeName == 'ZodArray') {
    let _schema = schema as ZodArray<AnyZodObject>;
    let schemas = Array.from({ length: 0 }).map(() => {
      return makeShapeBySchema(_schema.element, mode);
    });

    return schemas;
  } else if (
    schema instanceof ZodString ||
    schema instanceof ZodNumber ||
    schema instanceof ZodBoolean
  ) {
    let field = makeFieldShape(key, schema);
    return field;
  } else {
    console.log('error (not supported):', schema);
    throw 'schema is not supported';
  }
};

const makeShapeBySchema = <SCHEMA extends AnyZodObject>(
  schema: SCHEMA,
  mode: 'parent' | 'field'
) => {
  const fields: any = {
    mode,
  };
  for (const _key in schema.shape) {
    if (Object.prototype.hasOwnProperty.call(schema.shape, _key)) {
      let key = _key as keyof SCHEMA['shape'];
      const fieldSchema = schema.shape[key];
      const field = makeFieldBySchema(_key, fieldSchema);
      if (fields) {
        fields[key] = field;
      }
    }
  }

  return fields as {
    [key in keyof z.infer<SCHEMA>]: SCHEMA['shape'][key] extends ZodString
      ? IStringShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodNumber
      ? INumberShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodBoolean
      ? IBooleanShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends AnyZodObject
      ? IObjectShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodArray<AnyZodObject>
      ? IArrayShape<SCHEMA['shape'][key]>
      : undefined;
  };
};

const makeForm = <SCHEMA extends AnyZodObject>(
  schema: SCHEMA,
  config: { description?: string }
) => {
  let descriptedSchema = addDescriptionToSchema(
    schema,
    config.description || undefined
  );
  let formShape = makeShapeBySchema(descriptedSchema, 'parent');
  let isValid = ref(false);
  const getFormValues = (_shape: typeof formShape) => {
    let shape = _shape;
    let values: z.infer<SCHEMA> = {};
    // @ts-ignore
    if (shape?.mode == 'parent') {
      // @ts-ignore
      //   shape = _.omit(shape, 'mode');
      for (const key in shape) {
        if (
          Object.prototype.hasOwnProperty.call(shape, key) &&
          key !== 'mode'
        ) {
          const field = shape[key];
          if (field) {
            // @ts-ignore
            if (field instanceof Object && _.isArray(field) == false) {
              // @ts-ignore
              if (field.mode == 'parent') {
                // @ts-ignore
                values[key] = getFormValues(field);
              } else {
                // @ts-ignore
                values[key] = field.content.value;
              }
            } else {
              // @ts-ignore
              values[key] = field.map((i) => {
                // @ts-ignore
                return getFormValues(i);
              });
            }
          }
        }
      }
    }

    return values as z.infer<SCHEMA>;
  };

  const check = () => {
    let formValues = getFormValues(formShape);
    let parsedValues = descriptedSchema.safeParse(formValues);
    if (parsedValues.success == false) {
      isValid.value = false;
    } else {
      isValid.value = true;
    }
  };

  return {
    shape: formShape,
    getValues: () => {
      return getFormValues(formShape);
    },
    isValid,
    check,
  };
};

export default {
  makeForm,
  makeFieldBySchema,
};
