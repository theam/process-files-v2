import { EventHandler } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { Booster } from '@boostercloud/framework-core/dist/booster'
import { AddressAdded } from '../events/address-added'
import { FileAdded } from '@boostercloud/rocket-batch-file-process-aws-infrastructure/dist/events/file-added'
import { File } from '@boostercloud/rocket-batch-file-process-aws-infrastructure/dist/entities/file'

@EventHandler(FileAdded)
export class FileS3Event {
  public static async handle(event: FileAdded, register: Register): Promise<void> {
    const AWS = require('aws-sdk')
    const s3 = new AWS.S3()

    const file = await Booster.fetchEntitySnapshot(File, event.s3uri)
    if (file) {
      const s3uriArray = file.id.toString().split('/')
      const key = s3uriArray.pop()
      const bucketName = s3uriArray.pop()

      const params = {
        Bucket: bucketName,
        Key: key,
      }
      const data = await s3.getObject(params).promise()
      const content = data.Body.toString()
      const lines = content.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const values = lines[i].split(',')
        const newAddressAdded = new AddressAdded(
          UUID.generate(),
          values[1],
          values[2],
          values[3],
          values[4],
          values[5],
          values[6]
        )

        register.events(newAddressAdded)
      }
    }
  }
}
