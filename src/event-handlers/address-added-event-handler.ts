import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { AddressAdded } from '../generated/address-added'
import { SimplerAddressAdded } from '../events/simpler-address-added'

@EventHandler(AddressAdded)
export class AddressAddedEventHandler {
  public static async handle(event: AddressAdded, register: Register): Promise<void> {
    const simplerAddressEvent = new SimplerAddressAdded(
      event.id,
      event.firstName,
      event.lastName,
      `${event.address}, ${event.city}, ${event.state} - ${event.postalCode}`
    )

    register.events(simplerAddressEvent)
  }
}
