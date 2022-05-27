/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Cross-Origin-Opener-Policy标题
 */

import express from 'express'
import helmet from 'helmet'
import csp from './content_security_policy'
import coep from './cross_origin_embedder_policy'
import coop from './cross_origin_opener_policy'
import corp from './cross_origin_resource_policy'
import ec from './expect_ct'
import rp from './referrer_policy'
import hsts from './hsts'
import ns from './no_sniff'
import oac from './origin_agent_cluster'
import dpc from './dns_prefetch_control'
import ino from './ie_no_open'
import frameguard from './frameguard'
import pcdp from './permitted_cross_domain_policies'
import hpb from './hide_powered_by'
import xf from './xss_filter'

/**
 * Express 报文头的安全保护配置启动项加载
 * @param helmet Http 报文头配置项
 * @param server Express Server 
 */
export default function(helmetOption : any, server : express.Express) {
    if (Boolean(helmetOption)) {

        if (Boolean(helmetOption.contentSecurityPolicy)) {
            server.use(csp(helmetOption.contentSecurityPolicy))
        }

        if (Boolean(helmetOption.crossOriginEmbedderPolicy)) {
            server.use(coep())
        }

        if (Boolean(helmetOption.crossOriginOpenerPolicy)) {
            server.use(coop(helmetOption.crossOriginOpenerPolicy))
        }

        if (Boolean(helmetOption.crossOriginResourcePolicy)) {
            server.use(corp(helmetOption.crossOriginResourcePolicy))
        }

        if (Boolean(helmetOption.expectCt)) {
            server.use(ec(helmetOption.expectCt))
        }

        if (Boolean(helmetOption.referrerPolicy)) {
            server.use(rp(helmetOption.referrerPolicy))
        }

        if (Boolean(helmetOption.hsts)) {
            server.use(hsts(helmetOption.hsts))
        }

        if (Boolean(helmetOption.noSniff)) {
            server.use(ns())
        }

        if (Boolean(helmetOption.originAgentCluster)) {
            server.use(oac())
        }

        if (Boolean(helmetOption.dnsPrefetchControl)) {
            server.use(dpc(helmetOption.dnsPrefetchControl))
        }

        if (Boolean(helmetOption.ieNoOpen)) {
            server.use(ino())
        }

        if (Boolean(helmetOption.frameguard)) {
            server.use(frameguard(helmetOption.frameguard))
        }

        if (Boolean(helmetOption.permittedCrossDomainPolicies)) {
            server.use(pcdp(helmetOption.permittedCrossDomainPolicies))
        }

        if (Boolean(helmetOption.hidePoweredBy)) {
            server.use(hpb())
        }

        if (Boolean(helmetOption.xssFilter)) {
            server.use(xf())
        }

        if (typeof helmetOption === 'boolean') {
            server.use(helmet())
        }

    }
}