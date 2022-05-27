/**
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   封装所有异常、请求等数据体，返回前端统一格式数据，用于标准数据交互。
 */

 type JsonOutPut  = {
    code : number
    message : string
    status : boolean
    data : any
 }

 export default class {

    private static readonly messageMap : Map<number, string> = new Map<number, string>([
        [200, "Ok"],
        [201, "Created"],
        [202, "Accepted"],
        [203, "Non-Authoritative Information"],
        [204, "No Content"],
        [205, "Reset Content"],
        [206, "Partial Content"],
        [207, "Multi-Status"],
        [300, "Multiple Choices"],
        [301, "Moved Permanently"],
        [302, "Move Temporarily"],
        [303, "See Other"],
        [304, "Not Modified"],
        [305, "Use Proxy"],
        [306, "Switch Proxy"],
        [307, "Temporary Redirect"],
        [400, "Bad Request."],
		[401, "NotAuthorization."],
        [402, "Payment Required"],
        [403, "Forbidden"],
		[404, "not found"],
		[405, "Method Not Allowed."],
		[406, "Not Acceptable."],
        [407, "Proxy Authentication Required"],
        [408, "Request Timeout"],
        [409, "Conflict"],
        [410, "Gone"],
        [411, "Length Required"],
        [412, "Precondition Failed"],
        [413, "Request Entity Too Large"],
        [414, "Request-URI Too Long"],
        [415, "Unsupported Media Type"],
        [416, "Requested Range Not Satisfiable"],
        [417, "Expectation Failed"],
        [418, "I'm a teapot"],
        [421, "Misdirected Request"],
        [422, "Unprocessable Entity"],
        [423, "Locked"],
        [424, "Failed Dependency"],
        [425, "Too Early"],
        [426, "Upgrade Required"],
        [449, "Retry With"],
        [451, "Unavailable For Legal Reasons"],
        [500, "Server Error."],
        [501, "Not Implemented"],
        [502, "Bad Gateway"],
        [503, "Service Unavailable"],
        [504, "Gateway Timeout"],
        [505, "HTTP Version Not Supported"],
        [506, "Variant Also Negotiates"],
        [507, "Insufficient Storage"],
        [509, "Bandwidth Limit Exceeded"],
        [510, "Not Extended"],
        [600, "Unparseable Response Headers"]
    ]);

    

    public static restFromat(code : number, message : string, data : any) : JsonOutPut {
        let output : JsonOutPut = { code, message, status : code === 200, data };
        if(this.messageMap.has(code)) {
            output.message = message || this.messageMap.get(code) || '';
        }
        return output;
    }

 }