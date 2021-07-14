import { schema } from 'normalizr';
const widgetSchema = new schema.Entity('widgets', {}, { idAttribute: 'uid' });
const widgetListSchema = [widgetSchema];
export { widgetSchema, widgetListSchema };
