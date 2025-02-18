const {poolQuery} = require('../../dbConnection/mysqlCon');

const getTextModel = async(id) => {
    try {
        console.log(id)
        let textInformation = await poolQuery(`select text,id from text_analyzer where id = ?;`,[id])
        return textInformation
    } catch (error) {
        throw error
    }
}

const insertTextModel = async(text) => {
    try {
        const textInsertInfo = await poolQuery(`INSERT INTO text_analyzer (text) VALUES (?);`, [text])
        return textInsertInfo
    } catch (error) {
        throw error
    }
}

const deleteTextModel = async(id) => {
    try {
        await poolQuery(`DELETE FROM text_analyzer WHERE id = ?;`, [id])
    } catch (error) {
        throw error
    }
}

const updateTextModel = async(text,id) => {
    try {
        await poolQuery(`UPDATE text_analyzer SET text = ? WHERE id = ?);`, [text,id])
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTextModel,
    insertTextModel,
    updateTextModel,
    deleteTextModel
}