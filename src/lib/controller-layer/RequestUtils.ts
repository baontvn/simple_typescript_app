
import { RequestContext } from './RequestContext';

export class RequestUtils {
    
    public static getRequestContext(headers: any): RequestContext {

        if(!headers) {
            return null;
        }

        var userId: number = headers.userid;

        if(!userId) {
            return null;
        }

        if(isNaN(userId)) {
            return null;
        }

        var requestContext = new RequestContext(userId);
        return requestContext;
    }
}