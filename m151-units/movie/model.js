import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const sequelize = new Sequelize({ dialect: "sqlite", storage: "./movie.db" });

const Movies = sequelize.define(
    "Movies",
    { title: { type: Sequelize.STRING }, year: { type: Sequelize.INTEGER } },
    { timestamps: false }
);

export function getAll() {
    let db = new sqlite3.Database('../movie.db');

    let sql = `SELECT Id, Title, Year FROM movies`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        return rows;
    });
}

export function get(id) {
    let db = new sqlite3.Database('../movie.db');

    let sql = `SELECT Id, Title, Year FROM movies WHERE Id = ${id}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        
        return rows[0];
    });
}

export function remove(id) {
    let db = new sqlite3.Database('../movie.db');

    let sql = `DELETE movies WHERE Id = ${id}`;
}

export function save(movie) {
    let db = new sqlite3.Database('../movie.db');

    console.log('connected')
    db.run(`INSERT INTO Movie VALUES(${movie.id}, ${movie.title}, ${movie.year})`, ['C'], function(err) {
        if (err) {
          return console.log(err.message);
        }

        console.log(`A row has been inserted with rowid ${movie.id}`);
      });

    db.close();
}
