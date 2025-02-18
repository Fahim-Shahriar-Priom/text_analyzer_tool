const {getTextModel,insertTextModel,deleteTextModel, updateTextModel} = require('../model/textModel');

const getText = async(req, res) => {
    try {
        let textId = parseInt(req.params.textId)
        let textInformation = await getTextModel(textId)
        res.send({tl_status : 1000, textInformation})
    } catch (error) {
        res.send({tl_status: 4000 , error})
    }
}

const insertText = async (req, res) => {
    try {
        let { text } = req.body;
        if (!text) {
            return res.send({ tl_status: 4000, error: "Text field is required" });
        }
        let textInsertInfo = await insertTextModel(text);
        res.send({ tl_status: 1000, message: "Text inserted successfully", textInsertInfo });
    } catch (error) {
        res.send({ tl_status: 4000, error });
    }
};

const deleteText = async (req, res) => {
    try {
        let textId = parseInt(req.params.textId);
        await deleteTextModel(textId);        
        res.send({ tl_status: 1000, message: "Text deleted successfully" });
    } catch (error) {
        res.send({ tl_status: 4000, error });
    }
};

const updateText = async (req, res) => {
    try {
        let textId = parseInt(req.params.textId);
        let { text } = req.body;       
        if (!text) {
            return res.send({ tl_status: 4000, error: "Text field is required" });
        }      
        await updateTextModel(text, textId);       
        res.send({ tl_status: 1000, message: "Text updated successfully" });
    } catch (error) {
        res.send({ tl_status: 4000, error });
    }
};

module.exports = {
    getText,
    insertText,
    updateText,
    deleteText
}