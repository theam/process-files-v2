import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'process-files-v2'
  config.provider = Provider([
    {
      packageName: '@boostercloud/rocket-batch-file-process-aws-infrastructure',
      parameters: {
        bucketName: 'process-big-file-rocket',
        chunkSize: '2',
      },
    },
  ])
})
