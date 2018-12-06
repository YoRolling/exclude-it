import { Stats, lstat, access } from "fs";
import { isNullOrUndefined } from "util";

import * as path from 'path';

/**
 *  检测文件或者目录是否存在
 * @author YoRolling
 * @export
 * @param {string} _path
 * @returns {(Promise<boolean | Error>)}
 * @version 0.0.1
 */
export function exist(_path: string): Promise<boolean | Error> {
    if (isUnavail(_path)) {
        return Promise.reject(new Error(`${_path} should has a falsy value`));
    }
    return new Promise((res, rej) => {
        access(_path, (error: Error) => {
            if (isNullOrUndefined(error)) {
                res(true);
            } else {
                rej(error);
            }
        });
    });
}

/**
 * 检测传入路径是否合法 
 * @author YoRolling
 * @param {string} _path file path or folder's
 * @returns {boolean} 
 */
function isUnavail(_path: string): boolean {
    return isNullOrUndefined(_path) || _path === '';
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
        return Promise.reject(false);
    }
    try {
        await exist(_path);
        return new Promise<Stats | Error>((res, rej) => {
            lstat(_path, (error: Error, stats: Stats) => {
                if (!isNullOrUndefined(error)) {
                    rej(error);
                } else {
                    res(stats);
                }
            });
        });
    } catch (error) {
        return Promise.reject(error);
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
        return false;
    }
    try {
        const stats = <Stats>await lsStat(_path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}


export async function isFolder(_path: string): Promise<boolean> {
    if (isUnavail(_path)) {
        return false;
    }
    try {
        const stats = <Stats>await lsStat(_path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}
/**
 * @author YoRolling
 * @param filePath
 */
export async function parseFilePath(filePath: string,rootPath = ''): Promise<Meta | Error> {
    if (isUnavail(filePath)) {
        return Promise.reject(new Error(`${filePath} should have a fasly value`));
    }
    try {
        await exist(filePath);
        const extname = path.extname(filePath);
        const basename = path.basename(filePath);
        const dirname = path.relative(rootPath, path.dirname(filePath) );
        return {
            path: filePath,
            extname,
            basename,
            dirname
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

export interface Meta {
    path: string;
    extname: string;
    basename: string;
    dirname: string;
}