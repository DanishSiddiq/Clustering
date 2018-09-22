"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const transport_1 = require("../utils/transport");
const stringify = require("json-stringify-safe");
class Events {
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                emit: this.emit
            };
        });
    }
    emit(name, data) {
        if (!name) {
            return console.error('[PMX] emit.name is missing');
        }
        if (!data) {
            return console.error('[PMX] emit.data is missing');
        }
        let inflightObj = {};
        if (typeof (data) === 'object') {
            inflightObj = JSON.parse(stringify(data));
        }
        else {
            inflightObj.data = data;
        }
        inflightObj.__name = name;
        transport_1.default.send({
            type: 'human:event',
            data: inflightObj
        });
        return false;
    }
}
exports.default = Events;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrREFBMEM7QUFFMUMsaURBQWdEO0FBR2hEO0lBRVEsSUFBSTs7WUFDUixPQUFPO2dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQixDQUFBO1FBQ0gsQ0FBQztLQUFBO0lBRUQsSUFBSSxDQUFFLElBQUksRUFBRSxJQUFJO1FBQ2QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1NBQ25EO1FBRUQsSUFBSSxXQUFXLEdBQWlCLEVBQUUsQ0FBQTtRQUVsQyxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDN0IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDMUM7YUFBTTtZQUNMLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1NBQ3hCO1FBRUQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFFekIsbUJBQVMsQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUcsYUFBYTtZQUNwQixJQUFJLEVBQUcsV0FBVztTQUNuQixDQUFDLENBQUE7UUFDRixPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7Q0FDRjtBQWhDRCx5QkFnQ0MifQ==