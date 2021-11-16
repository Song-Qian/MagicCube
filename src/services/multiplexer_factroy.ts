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

const RestMultiplexerFactory = function() : IRestMultiplexer {
    return new RestMultiplexer()
}

const FileMultiplexerFactory = function() : IFileMultiplexer {
    return new FileMultiplexer();
}

const ViewMultiplexerFactory = function() : IViewMultiplexer {
    return new ViewMultiplexer();
}

const MultiplexerFactory = function (multiplexer: IMultiplexer) : IMultiplexer {

    if (multiplexer instanceof IFileMultiplexer) {
        return FileMultiplexerFactory();
    }

    if (multiplexer instanceof IViewMultiplexer) {
        return ViewMultiplexerFactory();
    }

    return RestMultiplexerFactory();
}

export default {
    Create : MultiplexerFactory
};