import { version } from '../../package.json';

export const VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

// 配置文件目录
export const RC = `${HOME}/.miorc`;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
export const DEFAULTS = {
    registry: 'xhx881221',
    type: 'users'
}