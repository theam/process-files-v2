import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { SimplerAddressAdded } from '../events/simpler-address-added'

@Entity
export class SimplerAddressEntity {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly fullAddress: string
  ) {}

  @Reduces(SimplerAddressAdded)
  public static reduceAddressAdded(
    event: SimplerAddressAdded,
    currentSimplerAddressEntity?: SimplerAddressEntity
  ): SimplerAddressEntity {
    return new SimplerAddressEntity(event.id, event.firstName, event.lastName, event.fullAddress)
  }
}
