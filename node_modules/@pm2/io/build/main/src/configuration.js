"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const debug = debug_1.default('axm:configuration');
const transport_1 = require("./utils/transport");
const autocast_1 = require("./utils/autocast");
const path = require("path");
const fs = require("fs");
const util = require("util");
const prefix = __dirname.replace(/\\/g, '/').indexOf('/build/') >= 0 ? '../../../' : '../';
const pkg = require(prefix + '/package.json');
class Configuration {
    static configureModule(opts) {
        transport_1.default.send({
            type: 'axm:option:configuration',
            data: opts
        });
    }
    static findPackageJson() {
        require.main = Configuration.getMain();
        if (!require.main) {
            return;
        }
        let pkgPath = path.resolve(path.dirname(require.main.filename), 'package.json');
        try {
            fs.statSync(pkgPath);
        }
        catch (e) {
            try {
                pkgPath = path.resolve(path.dirname(require.main.filename), '..', 'package.json');
                fs.statSync(pkgPath);
            }
            catch (e) {
                debug('Cannot find package.json');
                return null;
            }
            return pkgPath;
        }
        return pkgPath;
    }
    static init(conf, doNotTellPm2) {
        const packageFilepath = Configuration.findPackageJson();
        let packageJson;
        if (!conf.module_conf) {
            conf.module_conf = {};
        }
        if (conf.isModule === true) {
            /**
             * Merge package.json metadata
             */
            try {
                packageJson = require(packageFilepath || '');
                conf.module_version = packageJson.version;
                conf.module_name = packageJson.name;
                conf.description = packageJson.description;
                conf.pmx_version = null;
                if (pkg.version) {
                    conf.pmx_version = pkg.version;
                }
                if (packageJson.config) {
                    conf = util['_extend'](conf, packageJson.config);
                    conf.module_conf = packageJson.config;
                }
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            conf.module_name = process.env.name || 'outside-pm2';
            try {
                packageJson = require(packageFilepath || '');
                conf.module_version = packageJson.version;
                conf.pmx_version = null;
                if (pkg.version)
                    conf.pmx_version = pkg.version;
                if (packageJson.config) {
                    conf = util['_extend'](conf, packageJson.config);
                    conf.module_conf = packageJson.config;
                }
            }
            catch (e) {
                debug(e.message);
            }
        }
        /**
         * If custom variables has been set, merge with returned configuration
         */
        try {
            if (process.env[conf.module_name]) {
                const castedConf = new autocast_1.default().autocast(JSON.parse(process.env[conf.module_name] || ''));
                conf = util['_extend'](conf, castedConf);
                // Do not display probe configuration in Keymetrics
                delete castedConf.probes;
                // This is the configuration variable modifiable from keymetrics
                conf.module_conf = JSON.parse(JSON.stringify(util['_extend'](conf.module_conf, castedConf)));
                // Obfuscate passwords
                Object.keys(conf.module_conf).forEach(function (key) {
                    if ((key === 'password' || key === 'passwd') &&
                        conf.module_conf[key].length >= 1) {
                        conf.module_conf[key] = 'Password hidden';
                    }
                });
            }
        }
        catch (e) {
            debug(e);
        }
        if (doNotTellPm2 === true)
            return conf;
        Configuration.configureModule(conf);
        return conf;
    }
    static getMain() {
        return require.main || { filename: './somefile.js' };
    }
}
exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sS0FBSyxHQUFHLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRXhDLGlEQUF5QztBQUN6QywrQ0FBdUM7QUFDdkMsNkJBQTRCO0FBQzVCLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFFNUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7QUFDekYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsQ0FBQTtBQUU3QztJQUVFLE1BQU0sQ0FBQyxlQUFlLENBQUUsSUFBSTtRQUMxQixtQkFBUyxDQUFDLElBQUksQ0FBQztZQUNiLElBQUksRUFBRywwQkFBMEI7WUFDakMsSUFBSSxFQUFHLElBQUk7U0FDWixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWU7UUFFcEIsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsT0FBTTtTQUNQO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFFL0UsSUFBSTtZQUNGLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDckI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUk7Z0JB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