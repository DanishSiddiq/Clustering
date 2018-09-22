"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const debug = debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const metricConfig_1 = require("../utils/metricConfig");
const serviceManager_1 = require("../serviceManager");
class ProfilingHeap {
    constructor() {
        this.defaultConf = {
            samplingInterval: 32768
        };
        this.inspectorService = serviceManager_1.ServiceManager.get('inspector');
    }
    init(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            config = metricConfig_1.default.getConfig(config, this.defaultConf);
            this.config = config;
            this.inspectorService.createSession();
            this.inspectorService.connect();
            return this.inspectorService.post('HeapProfiler.enable');
        });
    }
    destroy() {
        this.inspectorService.disconnect();
    }
    start() {
        return this.inspectorService.post('HeapProfiler.startSampling', {
            samplingInterval: this.config.samplingInterval
        });
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getProfileInfo();
        });
    }
    takeSnapshot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const chunks = [];
            this.inspectorService.on('HeapProfiler.addHeapSnapshotChunk', (data) => {
                chunks.push(data.params.chunk);
            });
            yield this.inspectorService.post('HeapProfiler.takeHeapSnapshot', {
                reportProgress: false
            });
            return file_1.default.writeDumpFile(chunks.join(''), '.heapdump');
        });
    }
    getProfileInfo() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.inspectorService.post('HeapProfiler.stopSampling');
            }
            catch (err) {
                debug('Heap profiling stopped !');
                return reject(err);
            }
            resolve(file_1.default.writeDumpFile(JSON.stringify(data.profile), '.heapprofile'));
        }));
    }
}
exports.default = ProfilingHeap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9maWxpbmcvcHJvZmlsaW5nSGVhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBeUI7QUFDekIsTUFBTSxLQUFLLEdBQUcsZUFBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRXBDLHdDQUFxQztBQUNyQyx3REFBZ0Q7QUFFaEQsc0RBQWtEO0FBRWxEO0lBVUU7UUFOUSxnQkFBVyxHQUFHO1lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQTtRQUtDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRUssSUFBSSxDQUFFLE1BQU87O1lBQ2pCLE1BQU0sR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBRXBCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDMUQsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUM5RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtTQUMvQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssSUFBSTs7WUFDUixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUM5QixDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNoQixNQUFNLE1BQU0sR0FBa0IsRUFBRSxDQUFBO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFO2dCQUNoRSxjQUFjLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUE7WUFFRixPQUFPLGNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUM5RCxDQUFDO0tBQUE7SUFFTyxjQUFjO1FBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLENBQUE7WUFDUixJQUFJO2dCQUNGLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQTthQUNyRTtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO2dCQUNqQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNuQjtZQUVELE9BQU8sQ0FBQyxjQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDaEYsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQS9ERCxnQ0ErREMifQ==