import * as SQLite from 'expo-sqlite'
import { PostDataType } from './data'

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          resolve,
          (transaction, error) => {
            reject(error)
            return false
          }
        )
      })
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          // eslint-disable-next-line no-underscore-dangle
          (_, result) => resolve(result.rows._array),
          (_, error) => {
            reject(error)
            return false
          }
        )
      })
    })
  }

  static createPost(post: PostDataType) {
    const { text, date, booked, img } = post
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO posts (text, date, booked, img) VALUES (?,?,?,?)`,
          [text, date, booked, img],
          (_, result) => resolve(result.insertId),
          (_, error) => {
            reject(error)
            return false
          }
        )
      })
    })
  }

  static updatePost(post: PostDataType) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (transaction, error) => {
            reject(error)
            return false
          }
        )
      })
    })
  }

  static removePost(id: string) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          resolve,
          (transaction, error) => {
            reject(error)
            return false
          }
        )
      })
    })
  }
}
