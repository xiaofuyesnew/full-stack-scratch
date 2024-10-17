/**
 * 解析 .env 环境变量中的 JSON 字符串，不能正确转换的原值输出
 * @param {object} env - 环境变量原始对象
 * @returns {object} - 解析后的环境变量的对象
 */
export function generateEnv(env) {
  return Object.keys(env).reduce((acc, key) => {
    try {
      acc[key] = JSON.parse(env[key])
    }
    catch {
      acc[key] = env[key]
    }
    return acc
  }, {})
}

/**
 * 生成代理配置对象
 * @param {object} proxy - 包含代理配置的对象
 * @returns {object} - 包含生成的代理配置的对象
 */
export function generateProxy(proxy) {
  return Object.keys(proxy).reduce((acc, item) => {
    const target = proxy[item]
    acc[item] = {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${item}`), ''),
      secure: /^https:\/\//.test(target),
    }
    return acc
  }, {})
}
