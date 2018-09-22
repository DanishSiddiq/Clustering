"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const debug = debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const module_1 = require("../utils/module");
const configuration_1 = require("../configuration");
class ProfilingHeapFallback {
    constructor() {
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
        this.snapshot = this.profiler.takeSnapshot('km-heap-snapshot');
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getProfileInfo();
        });
    }
    takeSnapshot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.start();
            return this.stop();
        });
    }
    getProfileInfo() {
        return new Promise(resolve => {
            let buffer = '';
            this.snapshot.serialize((data, length) => {
                buffer += data;
            }, () => {
                this.snapshot.delete();
                resolve(buffer);
            });
        }).then((buffer) => {
            return file_1.default.writeDumpFile(buffer, '.heapprofile');
        });
    }
}
exports.default = ProfilingHeapFallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcEZhbGxiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGluZy9wcm9maWxpbmdIZWFwRmFsbGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sS0FBSyxHQUFHLGVBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUVwQyx3Q0FBcUM7QUFDckMsNENBQW1DO0FBQ25DLG9EQUE0QztBQUU1QztJQUFBO1FBSVUsZ0JBQVcsR0FBRyxtQkFBbUIsQ0FBQTtRQUNqQyx5QkFBb0IsR0FBRyxhQUFhLENBQUE7SUErRDlDLENBQUM7SUE3RE8sSUFBSTs7WUFDUixJQUFJLElBQUksQ0FBQTtZQUNSLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7WUFFakMsSUFBSTtnQkFDRixJQUFJLEdBQUcsTUFBTSxnQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7YUFDbkQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJO29CQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUE7b0JBQ3RDLElBQUksR0FBRyxNQUFNLGdCQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2lCQUM1RDtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWix1QkFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDNUIsUUFBUSxFQUFHLEtBQUs7cUJBQ2pCLENBQUMsQ0FBQTtvQkFDRixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7aUJBQ3pDO2FBQ0Y7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUVsRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsWUFBWSxLQUFLLENBQUMsQ0FBQTtZQUVoRCx1QkFBYSxDQUFDLGVBQWUsQ0FBQztnQkFDNUIsUUFBUSxFQUFHLE1BQU07YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNMLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFSyxJQUFJOztZQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3BCLENBQUM7S0FBQTtJQUVPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDckIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQTtZQUNoQixDQUFDLEVBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBRXRCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqQixDQUFDLENBQ0YsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pCLE9BQU8sY0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFDeEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFwRUQsd0NBb0VDIn0=