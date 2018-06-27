
import storage from 'electron-json-storage';

// 类似localStorage的API来保存和读取应用程序的用户设置
export default {
    get: (key) => {
        return new Promise((resolve, reject) => {
            storage.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    set: (key, data) => {
        return new Promise((resolve, reject) => {
            storage.set(key, data, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    remove: (key) => {
        return new Promise((resolve, reject) => {
            storage.remove(key, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};
