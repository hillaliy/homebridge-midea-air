import fs from 'fs';
import { Logger } from 'homebridge'

// MigrationHelper – Migrates the user's config.json from the old accessory to a platform
export class MigrationHelper {
	log: Logger
	configFilePath: string = ''

	constructor(log: Logger, configFilePath: string) {
		this.log = log;
		if (fs.existsSync(configFilePath)) {
			this.configFilePath = configFilePath
			let file = fs.readFileSync(configFilePath)
			let config = JSON.parse(file.toString())
			let migratedConfig = this.migrate(config);
			if (migratedConfig) {
				this.backupConfig();
				if (this.writeNewConfig(migratedConfig)) {
					this.restartHomebridge();
				}
			}
		}
	}
	// This method writes the new config file after the old accessory has been removed and the new platform added
	writeNewConfig(config: object) {
		let configString = JSON.stringify(config, null, '\t')
		fs.writeFile(this.configFilePath, configString, 'utf-8', (err: Error) => {
			if (err) {
				this.log.error("Could not rewrite config file to use platform instead of accessory, please adjust your configuration manually.")
				this.log.error(err.toString())
				return false;
			} else {
				this.log.info("Successfully migrated configuration to platform. Killing homebridge proccess to restart it")
				return true;
			}
		})
		return false
	}
	// This method creates a backup of the user's existing configuration
	backupConfig() {
		let file = fs.readFileSync(this.configFilePath)
		try {
			fs.writeFile(this.configFilePath + '.bak', file, 'utf-8', (err: Error) => {
				if (err) {
					this.log.warn("Error making backup of config")
				} else {
					this.log.debug("Made backup of config.json")
				}
			});
		} catch (e) {
			return false;
		}
	}
	// This method performs the permutation of the config object and removes the old accessory and adds the platform
	migrate(config: any) {
		let platformObject = {
			"platform": "midea-air",
			"interval": 30,
			"user": "",
			"password": ""
		}
		if (config.hasOwnProperty('platforms')) {
			for (var i = 0; i < config.platforms.length; i++) {
				if (config.platforms[i].platform == 'midea-air') {
					// We already have a platform, return
					return null
				}
			}
		} else {
			// We don't even have any platforms defined, let's create a new array
			config.platforms = []
		}
		if (config.hasOwnProperty('accessories')) {
			for (var i = 0; i < config.accessories.length; i++) {
				if (config.accessories[i].accessory === 'midea-air') {
					// We have an existing installation
					this.log.warn('Found existing Midea-air accessory, migrating');
					platformObject.user = config.accessories[i].user
					platformObject.password = config.accessories[i].password
					platformObject.interval = config.accessories[i].interval
					// Remove accessory
					config.accessories.splice(i, 1)
				}
			}
			config.platforms.push(platformObject)
			return config
		}
	}
	// Crude method of "restarting" homebridge, ideally there should be something better here
	restartHomebridge() {
		process.exit(1)
	}
}