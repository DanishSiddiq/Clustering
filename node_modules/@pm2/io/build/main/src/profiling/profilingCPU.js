"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const debug = debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const serviceManager_1 = require("../serviceManager");
class ProfilingCPU {
    constructor() {
        this.inspectorService = serviceManager_1.ServiceManager.get('inspector');
    }
    init() {
        this.inspectorService.createSession();
        this.inspectorService.connect();
        return this.inspectorService.post('Profiler.enable');
    }
    destroy() {
        this.inspectorService.disconnect();
    }
    start() {
        return this.inspectorService.post('Profiler.start');
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getProfileInfo();
        });
    }
    _convertTimeDeltas(profile) {
        if (!profile.timeDeltas)
            return null;
        let lastTimeUsec = profile.startTime;
        const timestamps = new Array(profile.timeDeltas.length + 1);
        for (let i = 0; i < profile.timeDeltas.length; ++i) {
            timestamps[i] = lastTimeUsec;
            lastTimeUsec += profile.timeDeltas[i];
        }
        timestamps[profile.timeDeltas.length] = lastTimeUsec;
        return timestamps;
    }
    getProfileInfo() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let rawData = yield this.inspectorService.post('Profiler.stop');
                if (!rawData || !rawData.profile)
                    return reject(`V8 Interval Error`);
                rawData = rawData.profile;
                let data = rawData;
                // recursively reformat the flatten tree into an actual tree
                const reformatNode = node => {
                    if (!node.children)
                        node.children = [];
                    node.children = node.children.map(childID => {
                        if (typeof childID !== 'number')
                            return childID;
                        const childNode = data.nodes.find(node => node.id === childID);
                        if (typeof childNode !== 'object')
                            return null;
                        childNode.callUID = node.id;
                        return childNode;
                    });
                    return {
                        functionName: node.callFrame.functionName,
                        url: node.callFrame.url,
                        lineNumber: node.callFrame.lineNumber,
                        callUID: node.callUID,
                        bailoutReason: '',
                        id: node.id,
                        scriptId: 0,
                        hitCount: node.hitCount,
                        children: node.children.map(reformatNode)
                    };
                };
                // reformat then only keep the root as top level node
                const nodes = data.nodes
                    .map(reformatNode)
                    .filter(node => node.functionName === '(root)')[0];
                // since it can be undefined, create an array so execution still works
                if (!data.timeDeltas) {
                    data.timeDeltas = [];
                }
                return resolve(file_1.default.writeDumpFile(JSON.stringify({
                    head: nodes,
                    typeId: 'CPU',
                    uid: '1',
                    startTime: Math.floor(data.startTime / 1000000),
                    title: 'km-cpu-profiling',
                    endTime: Math.floor(data.endTime / 1000000),
                    samples: data.samples,
                    timestamps: this._convertTimeDeltas(data)
                })));
            }
            catch (err) {
                debug('Cpu profiling stopped !');
                return reject(err);
            }
        }));
    }
}
exports.default = ProfilingCPU;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ1BVLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGluZy9wcm9maWxpbmdDUFUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLE1BQU0sS0FBSyxHQUFHLGVBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUVwQyx3Q0FBcUM7QUFDckMsc0RBQWtEO0FBR2xEO0lBSUU7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVLLElBQUk7O1lBQ1IsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDOUIsQ0FBQztLQUFBO0lBRU8sa0JBQWtCLENBQUUsT0FBc0I7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFDcEMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMzRCxLQUFLLElBQUksQ0FBQyxHQUFHLENB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