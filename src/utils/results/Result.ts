import { ResultInterface } from "./result.interface";

export class Result {
    message: string;
    success: boolean;
    result: any;
    error: Error;
    constructor(resultInterface : ResultInterface){
        this.message = resultInterface.message;
        this.success = resultInterface.success;
        this.result = resultInterface.result;
        this.error = resultInterface.error;
    }
    
}