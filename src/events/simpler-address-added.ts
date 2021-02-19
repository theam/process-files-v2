import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class SimplerAddressAdded {
  public constructor(
    readonly id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly fullAddress: string
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
