import { Feature } from './featureTypes';
export default class ActionsFeature implements Feature {
    private actionsService;
    private timer;
    constructor(autoExit?: boolean);
    listener(data: any): any;
    init(conf?: any, force?: any): Object;
    destroy(): void;
    action(actionName: any, opts?: any, fn?: any): false | undefined;
    scopedAction(actionName: any, fn: any): false | undefined;
    private check;
}
