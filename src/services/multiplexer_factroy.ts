/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   分发器创建工厂
 */

import IMultiplexer from './i_multiplexer'
import IRestMultiplexer from './i_rest_multiplexer'
import IFileMultiplexer from './i_file_multiplexer'
import IViewMultiplexer from './i_view_multiplexer'
import RestMultiplexer from './rest_multiplexer'
import FileMultiplexer from './file_multiplexer'
import ViewMultiplexer from './view_multiplexer'

const MultiplexerFactory = function <T extends IMultiplexer>(identifier : abstract new() => T, ...args: any[]) : IMultiplexer {
    
    const RestMultiplexerFactory = function() : IRestMultiplexer {
        return Reflect.construct(RestMultiplexer, args);
    }

    const FileMultiplexerFactory = function() : IFileMultiplexer {
        return Reflect.construct(FileMultiplexer, args);
    }

    const ViewMultiplexerFactory = function() : IViewMultiplexer {
        return Reflect.construct(ViewMultiplexer, args);
    }

    const factory = {
        "REST" : RestMultiplexerFactory,
        "FILE" : FileMultiplexerFactory,
        "VIEW" : ViewMultiplexerFactory
    }

    return factory[Reflect.getMetadata(Symbol.for("Kind"), identifier)]();
}

export default {
    Create : MultiplexerFactory
};