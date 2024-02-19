// const db = require('../config/db.js');

function expandConditions(conditions) {
    let output = " WHERE ";
    const conditionProps = Object.keys(conditions);

    for (let i = 0; i < (conditionProps.length - 1); i++) {
        output += `${conditionProps[i]} = ${conditions[conditionProps[i]]} AND `;
    }
    output += `${conditionProps[conditionProps.length - 1]} = ${conditions[conditionProps[conditionProps.length - 1]]}`;

    return output;
}

function isArray(item) {
    if (typeof item === 'object' && Object.getOwnPropertyNames(item).includes('length')) {
        return true;
    }

    return false;
}

class Column {
    constructor(name, isNumber = false) {
        this.name = name;
        this.isNumber = isNumber
    }

    static getNames(columns, columnTypeOnly = false) {
        const output = [];
        try {
            if (!isArray(columns)) {
                throw Error("Must be an array of column definitions");
            }

            for (const column of columns) {
                if (!column instanceof Column && columnTypeOnly) {
                    throw new Error("Column type only is true")
                }
                if (column instanceof Column) {
                    output.push(column.name);
                }
                if (typeof column === 'string') {
                    output.push(column);
                }
            }
        } catch (error) {
            console.log(error);
            return;
        }
        return output;
    }
}

class Record {
    static view(tbl_name, columns = [], conditions = {}) {
        const queryColumns = Column.getNames(columns);
        let queryConditions = "";

        try {
            if (conditions) {
                queryConditions = expandConditions(conditions);
            }
        
            return db.query(`SELECT ${queryColumns} FROM ${tbl_name}${queryConditions}`, (err, data) => data);

        } catch (error) {
            console.log(error);
        }
    }

    static add(tbl_name, columns, entries) {
        try {
            const entrySet = [];
            const columnSet = Column.getNames(columns);

            if (!isArray(entries)) {
                throw new Error("Entries must be an array");
            }
            
            for (const entry of entries) {
                let entryText = '(';
                for (let i = 0; i < (columnSet.length - 1); i++) {
                    if (columns.find(a => a.name === columnSet[i]).isNumber) {
                        entryText += `${entry[columnSet[i]]},`;
                    } else {
                        entryText += `"${entry[columnSet[i]]}",`;
                    }
                }
                if (columns.find(a => a.name === columnSet[columnSet.length - 1]).isNumber) {
                    entryText += `${entry[columnSet[columnSet.length - 1]]})`;
                } else {
                    entryText += `"${entry[columnSet[columnSet.length - 1]]}")`;
                }
                entrySet.push(entryText);
            }

            return db.query(`INSERT INTO ${tbl_name} (${columnSet}) VALUES ${entrySet.join()}`, (err, data) => data);

        } catch (error) {
            console.log(error);
        }
        
    }

    static update(tbl_name, column, value, conditions = undefined) {
        let queryConditions = "";
        try {
            if (conditions) {
                queryConditions = expandConditions(conditions);
            }

            return db.query(`UPDATE ${tbl_name} SET ${column.name} = ${column.isNumber ? value : `"${value}"`}${queryConditions}`, (err, data) => data);

        } catch (error) {
            console.log(error);
        }
    }

    remove(tbl_name, conditions = undefined) {
        let queryConditions = "";
        try {
            if (conditions) {
                queryConditions = expandConditions(conditions);
            }

            return db.query(`DELETE FROM ${tbl_name}${queryConditions}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Record,
    Column
};