import {
  Attribute,
  Entity,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  INDEX_TYPE,
} from '@typedorm/common';

@Entity({
  name: 'employee',
  primaryKey: {
    partitionKey: 'ORG#{{id}}',
    sortKey: 'ORG#{{id}}',
  },
  indexes: {
    GSI1: {
      partitionKey: 'ORG#{{id}}#STATUS#{{status}}',
      sortKey: 'ORG#{{id}}#ACTIVE#{{active}}',
      type: INDEX_TYPE.GSI,
    },
    // specify LSI1 key
    LSI1: {
      sortKey: 'TICKETS#UPDATED_AT#{{updatedAt}}',
      type: INDEX_TYPE.LSI,
    },
  },
})
export class Organisation {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  email: string;

  @Attribute()
  name: string;

  @Attribute()
  status: string;

  @Attribute()
  active: boolean;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true,
  })
  updatedAt: number;
}
