import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { SERVICE_URLS } from '../config/serviceUrls'

const router = express.Router()
router.use('/', createProxyMiddleware({
  target: SERVICE_URLS.payment,
  changeOrigin: true,
  pathRewrite: { '^/payments': '' },
}))

export default router