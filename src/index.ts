import { API } from 'homebridge'
import { MideaPlatform } from './MideaPlatform'
import { MigrationHelper } from './MigrationHelper'

export = (api: API) => {
  new MigrationHelper(console, api.user.configPath())
  api.registerPlatform('homebridge-midea-air', 'midea-air', MideaPlatform);
}