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

class Records {
    static view(tbl_name, fields, conditions = {}) {
        const queryFields = fields.length ? fields.join(' ') : '*';
        let queryConditions = "";

        if (conditions) {
            queryConditions = expandConditions(conditions);
        }
    
        return db.query(`SELECT ${queryFields} FROM ${tbl_name}${queryConditions}`, (err, data) => data);
    }

    static add(tbl_name, fields, values) {
        // TODO
    }

    static update(tbl_name, fields, values, conditions = undefined) {
        // TODO
    }

    remove(tbl_name, conditions = undefined) {
        // TODO
    }
}

module.exports = Records;