"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const plugin_1 = require("./plugin");
const logger_1 = require("./logger");
const child_process_1 = require("child_process");
const log = logger_1.Logger.internal;
/**
 * Utility which exposes methods to search for installed Homebridge plugins
 */
class PluginManager {
    constructor(api, options) {
        this.searchPaths = new Set(); // unique set of search paths we will use to discover installed plugins
        this.plugins = new Map();
        // we have some plugins which simply pass a wrong or misspelled plugin name to the api calls, this translation tries to mitigate this
        this.pluginIdentifierTranslation = new Map();
        this.accessoryToPluginMap = new Map();
        this.platformToPluginMap = new Map();
        this.api = api;
        if (options) {
            if (options.customPluginPath) {
                this.searchPaths.add(path_1.default.resolve(process.cwd(), options.customPluginPath));
            }
            this.activePlugins = options.activePlugins;
        }
        this.loadDefaultPaths();
        this.api.on("registerAccessory" /* REGISTER_ACCESSORY */, this.handleRegisterAccessory.bind(this));
        this.api.on("registerPlatform" /* REGISTER_PLATFORM */, this.handleRegisterPlatform.bind(this));
    }
    static isQualifiedPluginIdentifier(identifier) {
        return PluginManager.PLUGIN_IDENTIFIER_PATTERN.test(identifier);
    }
    static extractPluginName(name) {
        return name.match(PluginManager.PLUGIN_IDENTIFIER_PATTERN)[3];
    }
    static extractPluginScope(name) {
        return name.match(PluginManager.PLUGIN_IDENTIFIER_PATTERN)[2];
    }
    static getAccessoryName(identifier) {
        if (identifier.indexOf(".") === -1) {
            return identifier;
        }
        return identifier.split(".")[1];
    }
    static getPlatformName(identifier) {
        if (identifier.indexOf(".") === -1) {
            return identifier;
        }
        return identifier.split(".")[1];
    }
    static getPluginIdentifier(identifier) {
        return identifier.split(".")[0];
    }
    initializeInstalledPlugins() {
        this.loadInstalledPlugins();
        this.plugins.forEach((plugin, identifier) => {
            try {
                plugin.load();
            }
            catch (error) {
                log.error("====================");
                log.error(`ERROR LOADING PLUGIN ${identifier}:`);
                log.error(error.stack);
                log.error("====================");
                this.plugins.delete(identifier);
                return;
            }
            log.info(`Loaded plugin: ${identifier}@${plugin.version}`);
            try {
                this.currentInitializingPlugin = plugin;
                plugin.initialize(this.api); // call the plugin's initializer and pass it our API instance
            }
            catch (error) {
                log.error("====================");
                log.error(`ERROR INITIALIZING PLUGIN ${identifier}:`);
                log.error(error.stack);
                log.error("====================");
                this.plugins.delete(identifier);
                return;
            }
            log.info("---");
        });
        this.currentInitializingPlugin = undefined;
    }
    handleRegisterAccessory(name, constructor, pluginIdentifier) {
        if (!this.currentInitializingPlugin) {
            throw new Error(`Unexpected accessory registration. Plugin ${pluginIdentifier ? `'${pluginIdentifier}' ` : ""}tried to register outside the initializer function!`);
        }
        if (pluginIdentifier && pluginIdentifier !== this.currentInitializingPlugin.getPluginIdentifier()) {
            log.info(`Plugin '${this.currentInitializingPlugin.getPluginIdentifier()}' tried to register with an incorrect plugin identifier: '${pluginIdentifier}'. Please report this to the developer!`);
            this.pluginIdentifierTranslation.set(pluginIdentifier, this.currentInitializingPlugin.getPluginIdentifier());
        }
        this.currentInitializingPlugin.registerAccessory(name, constructor);
        let plugins = this.accessoryToPluginMap.get(name);
        if (!plugins) {
            plugins = [];
            this.accessoryToPluginMap.set(name, plugins);
        }
        plugins.push(this.currentInitializingPlugin);
    }
    handleRegisterPlatform(name, constructor, pluginIdentifier) {
        if (!this.currentInitializingPlugin) {
            throw new Error(`Unexpected platform registration. Plugin ${pluginIdentifier ? `'${pluginIdentifier}' ` : ""}tried to register outside the initializer function!`);
        }
        if (pluginIdentifier && pluginIdentifier !== this.currentInitializingPlugin.getPluginIdentifier()) {
            log.debug(`Plugin '${this.currentInitializingPlugin.getPluginIdentifier()}' tried to register with an incorrect plugin identifier: '${pluginIdentifier}'. Please report this to the developer!`);
            this.pluginIdentifierTranslation.set(pluginIdentifier, this.currentInitializingPlugin.getPluginIdentifier());
        }
        this.currentInitializingPlugin.registerPlatform(name, constructor);
        let plugins = this.platformToPluginMap.get(name);
        if (!plugins) {
            plugins = [];
            this.platformToPluginMap.set(name, plugins);
        }
        plugins.push(this.currentInitializingPlugin);
    }
    getPluginForAccessory(accessoryIdentifier) {
        let plugin;
        if (accessoryIdentifier.indexOf(".") === -1) { // see if it matches exactly one accessory
            const found = this.accessoryToPluginMap.get(accessoryIdentifier);
            if (!found) {
                throw new Error(`The requested accessory '${accessoryIdentifier}' was not registered by any plugin.`);
            }
            else if (found.length > 1) {
                const options = found.map(plugin => plugin.getPluginIdentifier() + "." + accessoryIdentifier).join(", ");
                throw new Error(`The requested accessory '${accessoryIdentifier}' has been registered multiple times. Please be more specific by writing one of: ${options}`);
            }
            else {
                plugin = found[0];
                accessoryIdentifier = plugin.getPluginIdentifier() + "." + accessoryIdentifier;
            }
        }
        else {
            const pluginIdentifier = PluginManager.getPluginIdentifier(accessoryIdentifier);
            if (!this.hasPluginRegistered(pluginIdentifier)) {
                throw new Error(`The requested plugin '${pluginIdentifier}' was not registered.`);
            }
            plugin = this.getPlugin(pluginIdentifier);
        }
        return plugin;
    }
    getPluginForPlatform(platformIdentifier) {
        let plugin;
        if (platformIdentifier.indexOf(".") === -1) { // see if it matches exactly one platform
            const found = this.platformToPluginMap.get(platformIdentifier);
            if (!found) {
                throw new Error(`The requested platform '${platformIdentifier}' was not registered by any plugin.`);
            }
            else if (found.length > 1) {
                const options = found.map(plugin => plugin.getPluginIdentifier() + "." + platformIdentifier).join(", ");
                throw new Error(`The requested platform '${platformIdentifier}' has been registered multiple times. Please be more specific by writing one of: ${options}`);
            }
            else {
                plugin = found[0];
                platformIdentifier = plugin.getPluginIdentifier() + "." + platformIdentifier;
            }
        }
        else {
            const pluginIdentifier = PluginManager.getPluginIdentifier(platformIdentifier);
            if (!this.hasPluginRegistered(pluginIdentifier)) {
                throw new Error(`The requested plugin '${pluginIdentifier}' was not registered.`);
            }
            plugin = this.getPlugin(pluginIdentifier);
        }
        return plugin;
    }
    hasPluginRegistered(pluginIdentifier) {
        return this.plugins.has(pluginIdentifier) || this.pluginIdentifierTranslation.has(pluginIdentifier);
    }
    getPlugin(pluginIdentifier) {
        const plugin = this.plugins.get(pluginIdentifier);
        if (plugin) {
            return plugin;
        }
        else {
            const translation = this.pluginIdentifierTranslation.get(pluginIdentifier);
            if (translation) {
                return this.plugins.get(translation);
            }
        }
        return undefined;
    }
    getPluginByActiveDynamicPlatform(platformName) {
        const found = (this.platformToPluginMap.get(platformName) || [])
            .filter(plugin => !!plugin.getActiveDynamicPlatform(platformName));
        if (found.length === 0) {
            return undefined;
        }
        else if (found.length > 1) {
            const plugins = found.map(plugin => plugin.getPluginIdentifier()).join(", ");
            throw new Error(`'${platformName}' is an ambiguous platform name. It was registered by multiple plugins: ${plugins}`);
        }
        else {
            return found[0];
        }
    }
    loadInstalledPlugins() {
        this.searchPaths.forEach(searchPath => {
            if (!fs_1.default.existsSync(searchPath)) { // just because this path is in require.main.paths doesn't mean it necessarily exists!
                return;
            }
            if (fs_1.default.existsSync(path_1.default.join(searchPath, "package.json"))) { // does this path point inside a single plugin and not a directory containing plugins?
                try {
                    this.loadPlugin(searchPath);
                }
                catch (error) {
                    log.warn(error.message);
                    return;
                }
            }
            else { // read through each directory in this node_modules folder
                const relativePluginPaths = fs_1.default.readdirSync(searchPath) // search for directories only
                    .filter(relativePath => fs_1.default.statSync(path_1.default.resolve(searchPath, relativePath)).isDirectory());
                // expand out @scoped plugins
                relativePluginPaths.slice()
                    .filter(path => path.charAt(0) === "@") // is it a scope directory?
                    .forEach(scopeDirectory => {
                    // remove scopeDirectory from the path list
                    const index = relativePluginPaths.indexOf(scopeDirectory);
                    relativePluginPaths.splice(index, 1);
                    const absolutePath = path_1.default.join(searchPath, scopeDirectory);
                    fs_1.default.readdirSync(absolutePath)
                        .filter(name => PluginManager.isQualifiedPluginIdentifier(name))
                        .filter(name => fs_1.default.statSync(path_1.default.resolve(absolutePath, name)).isDirectory())
                        .forEach(name => relativePluginPaths.push(scopeDirectory + "/" + name));
                });
                relativePluginPaths
                    .filter(pluginIdentifier => {
                    return PluginManager.isQualifiedPluginIdentifier(pluginIdentifier) // needs to be a valid homebridge plugin name
                        && (!this.activePlugins || this.activePlugins.includes(pluginIdentifier)); // check if activePlugins is restricted and if so if the plugin is contained
                })
                    .forEach(pluginIdentifier => {
                    try {
                        const absolutePath = path_1.default.resolve(searchPath, pluginIdentifier);
                        this.loadPlugin(absolutePath);
                    }
                    catch (error) {
                        log.warn(error.message);
                        return;
                    }
                });
            }
        });
        if (this.plugins.size === 0) {
            log.warn("No plugins found. See the README for information on installing plugins.");
        }
    }
    loadPlugin(absolutePath) {
        const packageJson = PluginManager.loadPackageJSON(absolutePath);
        const identifier = packageJson.name;
        const name = PluginManager.extractPluginName(identifier);
        const scope = PluginManager.extractPluginScope(identifier); // possibly undefined
        const alreadyInstalled = this.plugins.get(identifier); // check if there is already a plugin with the same Identifier
        if (alreadyInstalled) {
            throw new Error(`Warning: skipping plugin found at '${absolutePath}' since we already loaded the same plugin from '${alreadyInstalled.getPluginPath()}'.`);
        }
        const plugin = new plugin_1.Plugin(name, absolutePath, packageJson, scope);
        this.plugins.set(identifier, plugin);
        return plugin;
    }
    static loadPackageJSON(pluginPath) {
        const packageJsonPath = path_1.default.join(pluginPath, "package.json");
        let packageJson;
        if (!fs_1.default.existsSync(packageJsonPath)) {
            throw new Error(`Plugin ${pluginPath} does not contain a package.json.`);
        }
        try {
            packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, { encoding: "utf8" })); // attempt to parse package.json
        }
        catch (err) {
            throw new Error(`Plugin ${pluginPath} contains an invalid package.json. Error: ${err}`);
        }
        if (!packageJson.name || !PluginManager.isQualifiedPluginIdentifier(packageJson.name)) {
            throw new Error(`Plugin ${pluginPath} does not have a package name that begins with 'homebridge-' or '@scope/homebridge-.`);
        }
        // verify that it's tagged with the correct keyword
        if (!packageJson.keywords || !packageJson.keywords.includes("homebridge-plugin")) {
            throw new Error(`Plugin ${pluginPath} package.json does not contain the keyword 'homebridge-plugin'.`);
        }
        return packageJson;
    }
    loadDefaultPaths() {
        if (require.main) {
            // add the paths used by require()
            require.main.paths.forEach(path => this.searchPaths.add(path));
        }
        // THIS SECTION FROM: https://github.com/yeoman/environment/blob/master/lib/resolver.js
        // Adding global npm directories
        // We tried using npm to get the global modules path, but it haven't work out
        // because of bugs in the parsable implementation of `ls` command and mostly
        // performance issues. So, we go with our best bet for now.
        if (process.env.NODE_PATH) {
            process.env.NODE_PATH
                .split(path_1.default.delimiter)
                .filter(path => !!path) // trim out empty values
                .forEach(path => this.searchPaths.add(path));
        }
        else {
            // Default paths for each system
            if (process.platform === "win32") {
                this.searchPaths.add(path_1.default.join(process.env.APPDATA, "npm/node_modules"));
            }
            else {
                this.searchPaths.add("/usr/local/lib/node_modules");
                this.searchPaths.add("/usr/lib/node_modules");
                this.searchPaths.add(child_process_1.execSync("/bin/echo -n \"$(npm --no-update-notifier -g prefix)/lib/node_modules\"").toString("utf8"));
            }
        }
    }
}
exports.PluginManager = PluginManager;
// name must be prefixed with 'homebridge-' or '@scope/homebridge-'
PluginManager.PLUGIN_IDENTIFIER_PATTERN = /^((@[\w-]*)\/)?(homebridge-[\w-]*)$/;
//# sourceMappingURL=pluginManager.js.map