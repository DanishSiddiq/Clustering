"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
class FileUtils {
    static writeDumpFile(data, extension) {
        extension = extension ? extension : '.cpuprofile';
        return new Promise((resolve, reject) => {
            const cpuDumpFile = path.join(os.tmpdir(), Date.now() + extension);
            fs.writeFile(cpuDumpFile, data, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve(cpuDumpFile);
            });
        });
    }
    static getFileSize(dumpFile) {
        return new Promise((resolve, reject) => {
            fs.stat(dumpFile, (err, stats) => {
                let fileSizeInMegabytes = 0;
                if (err) {
                    return reject(err);
                }
                const fileSizeInBytes = stats.size;
                // Convert the file size to megabytes
                fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
                resolve(fileSizeInMegabytes);
            });
        });
    }
}
exports.default = FileUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXdCO0FBQ3hCLDZCQUE0QjtBQUM1Qix5QkFBd0I7QUFFeEI7SUFDRSxNQUFNLENBQUMsYUFBYSxDQUFFLElBQUksRUFBRSxTQUFVO1FBQ3BDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO1FBRWpELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFBO1lBRWxFLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUc7Z0JBQzNDLElBQUksR0FBRyxFQUFFO29CQUNQLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNuQjtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUUsUUFBUTtRQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMvQixJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQTtnQkFFM0IsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ25CO2dCQUVELE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7Z0JBQ2xDLHFDQUFxQztnQkFDckMsbUJBQW1CLEdBQUcsZUFBZSxHQUFHLFNBQVMsQ0FBQTtnQkFFakQsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWxDRCw0QkFrQ0MifQ==