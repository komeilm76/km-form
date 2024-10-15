import {
  AnyZodObject,
  z,
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodOptional,
  ZodString,
  ZodTypeAny,
  ZodUndefined,
} from 'zod';

import _ from 'lodash';
import { ref } from 'km-fresh';
import { PartialDeep } from 'type-fest';

const notSupported = '*notSupported*';

const addDescriptionToSchema = <SCHEMA extends AnyZodObject>(
  schema: SCHEMA,
  description: string | undefined
) => {
  let describedSchema = schema.describe(
    description || 'Description Is Not Exist'
  );
  return describedSchema;
};

const logger = (v: number, enable: boolean = true) => {
  if (enable == true) {
    console.log('log:', v);
  }
};

const makeDefaultValueBySchema = (schemaValue: any) => {
  let initialValue = undefined;
  if (schemaValue instanceof ZodString) {
    initialValue = '';
    logger(1);
  } else if (schemaValue instanceof ZodDate) {
    initialValue = '';
    logger(2);
  } else if (schemaValue instanceof ZodNumber) {
    initialValue = 0;
    logger(3);
  } else if (schemaValue instanceof ZodBoolean) {
    initialValue = false;
    logger(4);
  } else if (schemaValue instanceof ZodNull) {
    initialValue = null;
    logger(5);
  } else if (schemaValue instanceof ZodUndefined) {
    initialValue = undefined;
    logger(6);
  } else if (schemaValue instanceof ZodDefault) {
    let innerType = schemaValue._def.innerType;
    let defaultValue = schemaValue._def.defaultValue();
    if (innerType instanceof ZodString) {
      initialValue = (defaultValue as string) || '';
      logger(7);
    } else if (innerType instanceof ZodDate) {
      initialValue = (defaultValue as string) || '';
      logger(8);
    } else if (innerType instanceof ZodNumber) {
      initialValue = (defaultValue as number) || 0;
      logger(9);
    } else if (innerType instanceof ZodBoolean) {
      initialValue = (defaultValue as boolean) || false;
      logger(10);
    } else if (innerType instanceof ZodNull) {
      initialValue = (defaultValue as null) || null;
      logger(11);
    } else if (innerType instanceof ZodUndefined) {
      initialValue = (defaultValue as undefined) || undefined;
      logger(12);
    } else {
      initialValue = notSupported;
      logger(13);
    }
  } else if (schemaValue instanceof ZodOptional) {
    let innerType = schemaValue._def.innerType;
    if (innerType instanceof ZodString) {
      initialValue = undefined;
      logger(14);
    } else if (innerType instanceof ZodDate) {
      initialValue = undefined;
      logger(15);
    } else if (innerType instanceof ZodNumber) {
      initialValue = undefined;
      logger(16);
    } else if (innerType instanceof ZodBoolean) {
      initialValue = undefined;
      logger(17);
    } else if (innerType instanceof ZodNull) {
      initialValue = undefined;
      logger(18);
    } else if (innerType instanceof ZodUndefined) {
      initialValue = undefined;
      logger(18);
    } else {
      initialValue = notSupported;
      logger(20);
    }
  } else if (schemaValue instanceof ZodNullable) {
    let innerType = schemaValue._def.innerType;
    if (innerType instanceof ZodString) {
      initialValue = null;
      logger(21);
    } else if (innerType instanceof ZodDate) {
      initialValue = null;
      logger(22);
    } else if (innerType instanceof ZodNumber) {
      initialValue = null;
      logger(23);
    } else if (innerType instanceof ZodBoolean) {
      initialValue = null;
      logger(24);
    } else if (innerType instanceof ZodNull) {
      initialValue = null;
      logger(25);
    } else if (innerType instanceof ZodUndefined) {
      initialValue = null;
      logger(26);
    } else {
      initialValue = notSupported;
      logger(27);
    }
  } else {
    initialValue = notSupported;
    logger(27);
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
type IDateShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<Date>>;
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
type INullShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<null>>;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};
type IUndefinedShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: ReturnType<typeof ref<undefined>>;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};

type IDefaultShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: SCHEMA extends ZodDefault<ZodString>
    ? ReturnType<typeof ref<string>>
    : SCHEMA extends ZodDefault<ZodDate>
    ? ReturnType<typeof ref<Date>>
    : SCHEMA extends ZodDefault<ZodNumber>
    ? ReturnType<typeof ref<number>>
    : SCHEMA extends ZodDefault<ZodBoolean>
    ? ReturnType<typeof ref<boolean>>
    : SCHEMA extends ZodDefault<ZodNull>
    ? ReturnType<typeof ref<null>>
    : SCHEMA extends ZodDefault<ZodUndefined>
    ? ReturnType<typeof ref<undefined>>
    : typeof notSupported;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};

type IOptionalShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: SCHEMA extends ZodOptional<ZodString>
    ? ReturnType<typeof ref<undefined | string>>
    : SCHEMA extends ZodOptional<ZodDate>
    ? ReturnType<typeof ref<undefined | Date>>
    : SCHEMA extends ZodOptional<ZodNumber>
    ? ReturnType<typeof ref<undefined | number>>
    : SCHEMA extends ZodOptional<ZodBoolean>
    ? ReturnType<typeof ref<undefined | boolean>>
    : SCHEMA extends ZodOptional<ZodNull>
    ? ReturnType<typeof ref<undefined | null>>
    : SCHEMA extends ZodOptional<ZodUndefined>
    ? ReturnType<typeof ref<undefined>>
    : typeof notSupported;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};

type INullableShape<SCHEMA extends ZodTypeAny> = {
  mode: 'field';
  title: string;
  key: string;
  content: SCHEMA extends ZodNullable<ZodString>
    ? ReturnType<typeof ref<null | string>>
    : SCHEMA extends ZodNullable<ZodDate>
    ? ReturnType<typeof ref<null | Date>>
    : SCHEMA extends ZodNullable<ZodNumber>
    ? ReturnType<typeof ref<null | number>>
    : SCHEMA extends ZodNullable<ZodBoolean>
    ? ReturnType<typeof ref<null | boolean>>
    : SCHEMA extends ZodNullable<ZodNull>
    ? ReturnType<typeof ref<null>>
    : SCHEMA extends ZodNullable<ZodUndefined>
    ? ReturnType<typeof ref<null | undefined>>
    : typeof notSupported;
  schema: SCHEMA;
  errors: typeof ref<[]>;
};

type IObjectShape<SCHEMA extends AnyZodObject = AnyZodObject> = {
  mode: 'parent';
} & {
  [key in keyof SCHEMA['shape']]: SCHEMA['shape'][key] extends ZodString
    ? IStringShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodDate
    ? IDateShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodNumber
    ? INumberShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodBoolean
    ? IBooleanShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodNull
    ? INullShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodUndefined
    ? IUndefinedShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodDefault<ZodTypeAny>
    ? IDefaultShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodOptional<ZodTypeAny>
    ? IOptionalShape<SCHEMA['shape'][key]>
    : SCHEMA['shape'][key] extends ZodNullable<ZodTypeAny>
    ? INullableShape<SCHEMA['shape'][key]>
    : typeof notSupported;
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
    : SCHEMA['element']['shape'][key] extends ZodNull
    ? INullShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodUndefined
    ? IUndefinedShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodDefault<ZodTypeAny>
    ? IDefaultShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodOptional<ZodTypeAny>
    ? IOptionalShape<SCHEMA['element']['shape'][key]>
    : SCHEMA['element']['shape'][key] extends ZodNullable<ZodTypeAny>
    ? INullableShape<SCHEMA['element']['shape'][key]>
    : typeof notSupported;
}[];

type IZodTypes =
  | 'ZodNumber' // *
  | 'ZodBigInt'
  | 'ZodString' // *
  | 'ZodAny'
  | 'ZodNever'
  | 'ZodUnknown'
  | 'ZodVoid'
  | 'ZodBoolean' // *
  | 'ZodDate' // *
  | 'ZodSymbol'
  | 'ZodLiteral'
  | 'ZodUnion'
  | 'ZodTuple'
  | 'ZodObject' // *
  | 'ZodArray' // *
  | 'ZodDefault'
  | 'ZodOptional'
  | 'ZodNullable'
  | 'ZodNull' // *
  | 'ZodUndefined'; // *

// @ts-ignore
const getTypeSchema = (schema: ZodTypeAny) => {
  let output = schema._def.typeName as IZodTypes;
  return output;
};

const makeFieldShape = (key: string, schema: ZodTypeAny) => {
  console.log('schema:before-create-default-value', schema);
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
  let typeOfSchema = getTypeSchema(schema);

  if (typeOfSchema == 'ZodObject') {
    let _schema = schema as AnyZodObject;
    return makeShapeBySchema(_schema, mode);
  }
  if (typeOfSchema == 'ZodArray') {
    let _schema = schema as ZodArray<AnyZodObject>;
    let schemas = Array.from({ length: 1 }).map(() => {
      return makeShapeBySchema(_schema.element, mode);
    });

    return schemas;
  } else if (
    typeOfSchema == 'ZodString' ||
    typeOfSchema == 'ZodDate' ||
    typeOfSchema == 'ZodNumber' ||
    typeOfSchema == 'ZodBoolean' ||
    typeOfSchema == 'ZodNull' ||
    typeOfSchema == 'ZodUndefined' ||
    typeOfSchema == 'ZodDefault' ||
    typeOfSchema == 'ZodOptional' ||
    typeOfSchema == 'ZodNullable'
  ) {
    let field = makeFieldShape(key, schema);
    return field;
  } else {
    console.log(`error (not supported):${typeOfSchema}`, schema);
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
      : SCHEMA['shape'][key] extends ZodDate
      ? IDateShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodNumber
      ? INumberShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodBoolean
      ? IBooleanShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodNull
      ? INullShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodUndefined
      ? IUndefinedShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodDefault<ZodTypeAny>
      ? IDefaultShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodOptional<ZodTypeAny>
      ? IOptionalShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodNullable<ZodTypeAny>
      ? INullableShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends AnyZodObject
      ? IObjectShape<SCHEMA['shape'][key]>
      : SCHEMA['shape'][key] extends ZodArray<AnyZodObject>
      ? IArrayShape<SCHEMA['shape'][key]>
      : typeof notSupported;
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
  const setFormValues = (
    _shape: typeof formShape,
    values: PartialDeep<z.infer<SCHEMA>>,
    _schema: SCHEMA
  ) => {
    for (const _key in values) {
      if (Object.prototype.hasOwnProperty.call(values, _key)) {
        let key = _key as keyof typeof values;
        let schema = _schema.shape[key];
        // @ts-ignore
        let value = values[key];
        let path = `${_key}.content.value`;

        let mode = _.get(_shape, `${_key}.mode`);
        // @ts-ignore
        let newShape = _shape[key];

        // @ts-ignore
        if (mode == 'parent') {
          // @ts-ignore
          setFormValues(newShape, value, schema);
          // @ts-ignore
        } else if (mode == 'field') {
          // @ts-ignore
          _.set(_shape, path, values[key]);
        } else {
          let arraySchema = schema as ZodArray<AnyZodObject>;
          let elementSchema = arraySchema.element;
          let arrayValue = value as any[];
          arrayValue.forEach((item, index) => {
            let elementForm = makeForm(elementSchema, {});
            elementForm.setValues(item);
            // @ts-ignore
            newShape[index] = elementForm.shape;
          });
        }
      }
    }
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
    setValues: (values: PartialDeep<z.infer<SCHEMA>>) => {
      setFormValues(formShape, values, schema);
    },
  };
};

export default {
  makeForm,
  makeFieldBySchema,
};
