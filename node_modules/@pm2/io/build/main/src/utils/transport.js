"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const stringify = require("json-stringify-safe");
const debug = debug_1.default('axm:transport');
class Transport {
    static send(args) {
        /**
         * For debug purpose
         */
        if (process.env.MODULE_DEBUG) {
            debug(args);
        }
        if (!process.send) {
            return -1;
        }
        const msg = args instanceof Error ? args.message : args;
        try {
            process.send(JSON.parse(stringify(msg)));
        }
        catch (e) {
            debug('Process disconnected from parent !');
            debug(e.stack || e);
            process.exit(1);
        }
        return 0;
    }
}
exports.default = Transport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixpREFBZ0Q7QUFFaEQsTUFBTSxLQUFLLEdBQUcsZUFBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRXBDO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFpQjtRQUU1Qjs7V0FFRztRQUNILElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ1o7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ1Y7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFdkQsSUFBSTtZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtZQUMzQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2hCO1FBRUQsT0FBTyxDQUFDLENBQUE7SUFDVixDQUFDO0NBQ0Y7QUExQkQsNEJBMEJDIn0=