import { Stats, lstat, access } from 'fs'

import * as path from 'path'

export interface Meta {
  path: string
  extname: string
  basename: string
  dirname: string
}
const isNullOrUndefined = (value: any) => value === null || undefined === value
/**
 * 检测文件或者目录是否存在
 * @author YoRolling
 * @export
 * @param {string} _path
 * @returns {(Promise<boolean | Error>)}
 * @version 0.0.1
 */
export function exist(_path: string): Promise<boolean | Error> {
  if (isUnavail(_path)) {
    return Promise.reject(new Error(`${_path} should has a falsy value`))
  }
  return new Promise((resolve, reject) => {
    access(_path, undefined, (error: Error | null) => {
      if (!isNullOrUndefined(error)) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 检测传入路径是否合法
 * @author YoRolling
 * @param {string} _path file path or folder's
 * @returns {boolean}
 */
function isUnavail(_path: string): boolean {
  return isNullOrUndefined(_path) || _path === ''
}

/**
 * get stats for _path
 * @author YoRolling`
 * @export
 * @param {string} _path
 * @returns {(Promise<Stats | Error >)}
 */
export async function lsStat(_path: string): Promise<Stats | Error> {
  if (isUnavail(_path)) {
    return Promise.reject(Error('File Does not avaliable'))
  }
  try {
    await exist(_path)
    return new Promise<Stats | Error>((resolve, reject) => {
      lstat(_path, (error: Error | null, stats: Stats) => {
        if (!isNullOrUndefined(error)) {
          reject(error)
        } else {
          resolve(stats)
        }
      })
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * @author YoRolling
 * @version 0.1.1
 * @export
 * @param {string} _path
 * @returns {(Promise<boolean | Error>)}
 */
export async function isFile(_path: string): Promise<boolean> {
  if (isUnavail(_path)) {
    return false
  }
  try {
    const stats = <Stats>await lsStat(_path)
    return stats.isFile()
  } catch (error) {
    return false
  }
}

export async function isFolder(_path: string): Promise<boolean> {
  if (isUnavail(_path)) {
    return false
  }
  try {
    const stats = <Stats>await lsStat(_path)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}
/**
 * @author YoRolling
 * @param filePath
 */
export async function parseFilePath(filePath: string, rootPath = ''): Promise<Meta | Error> {
  if (isUnavail(filePath)) {
    return Promise.reject(new Error(`${filePath} should have a fasly value`))
  }

  try {
    await exist(filePath)
    const extname = path.extname(filePath)
    const basename = path.basename(filePath)
    const dirname = path.relative(rootPath, path.dirname(filePath))
    return {
      path: filePath,
      extname,
      basename,
      dirname,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
