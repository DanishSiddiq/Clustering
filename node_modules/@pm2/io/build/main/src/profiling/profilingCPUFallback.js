"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const debug = debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const module_1 = require("../utils/module");
const configuration_1 = require("../configuration");
class ProfilingCPUFallback {
    constructor() {
        this.nsCpuProfiling = 'km-cpu-profiling';
        this.MODULE_NAME = 'v8-profiler-node8';
        this.FALLBACK_MODULE_NAME = 'v8-profiler';
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let path;
            let moduleName = this.MODULE_NAME;
            try {
                path = yield module_1.default.getModulePath(this.MODULE_NAME);
            }
            catch (e) {
                try {
                    moduleName = this.FALLBACK_MODULE_NAME;
                    path = yield module_1.default.getModulePath(this.FALLBACK_MODULE_NAME);
                }
                catch (err) {
                    configuration_1.default.configureModule({
                        heapdump: false
                    });
                    throw new Error('Profiler not loaded !');
                }
            }
            this.profiler = module_1.default.loadModule(path, moduleName);
            const enable = !(this.profiler instanceof Error);
            configuration_1.default.configureModule({
                heapdump: enable
            });
        });
    }
    destroy() {
        debug('Profiler destroyed !');
    }
    start() {
        this.profiler.startProfiling(this.nsCpuProfiling);
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getProfileInfo();
        });
    }
    getProfileInfo() {
        const cpu = this.profiler.stopProfiling(this.nsCpuProfiling);
        return file_1.default.writeDumpFile(JSON.stringify(cpu));
    }
}
exports.default = ProfilingCPUFallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ1BVRmFsbGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsaW5nL3Byb2ZpbGluZ0NQVUZhbGxiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUF5QjtBQUN6QixNQUFNLEtBQUssR0FBRyxlQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFcEMsd0NBQXFDO0FBQ3JDLDRDQUFtQztBQUNuQyxvREFBNEM7QUFFNUM7SUFBQTtRQUVVLG1CQUFjLEdBQVcsa0JBQWtCLENBQUE7UUFFM0MsZ0JBQVcsR0FBRyxtQkFBbUIsQ0FBQTtRQUNqQyx5QkFBb0IsR0FBRyxhQUFhLENBQUE7SUE4QzlDLENBQUM7SUE1Q08sSUFBSTs7WUFDUixJQUFJLElBQUksQ0FBQTtZQUNSLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7WUFFakMsSUFBSTtnQkFDRixJQUFJLEdBQUcsTUFBTSxnQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7YUFDbkQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJO29CQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUE7b0JBQ3RDLElBQUksR0FBRyxNQUFNLGdCQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2lCQUM1RDtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWix1QkFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDNUIsUUFBUSxFQUFHLEtBQUs7cUJBQ2pCLENBQUMsQ0FBQTtvQkFDRixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7aUJBQ3pDO2FBQ0Y7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUVsRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsWUFBWSxLQUFLLENBQUMsQ0FBQTtZQUVoRCx1QkFBYSxDQUFDLGVBQWUsQ0FBQztnQkFDNUIsUUFBUSxFQUFHLE1BQU07YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNMLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFSyxJQUFJOztZQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FBQTtJQUVPLGNBQWM7UUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTVELE9BQU8sY0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBbkRELHVDQW1EQyJ9