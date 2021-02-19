import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { SimplerAddressEntity } from '../entities/simpler-address-entity'

@ReadModel({
  authorize: 'all',
})
export class SimplerAddress {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly fullAddress: string
  ) {}

  @Projects(SimplerAddressEntity, 'id')
  public static projectListeningAnalyticsEntity(
    entity: SimplerAddressEntity,
    currentSimpleAddress?: SimplerAddress
  ): ProjectionResult<SimplerAddress> {
    return new SimplerAddress(entity.id, entity.firstName, entity.lastName, entity.fullAddress)
  }
}
