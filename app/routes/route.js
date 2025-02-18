const express = require("express");
const TextController = require("../controller/textController");
const TextAnalyzerController = require("../controller/textAnalyzerController");


const router = express.Router();

router.get("/getText/:textId", TextController.getText);
router.post("/insertText", TextController.insertText);
router.delete("/deleteText/:textId", TextController.deleteText);
router.put("/updateText/:textId", TextController.updateText);
router.post("/getWordCount", TextAnalyzerController.getWordCountAPI);
router.post("/getCharacterCount", TextAnalyzerController.getCharacterCountAPI);
router.post("/getSentenceCount", TextAnalyzerController.getSentenceCountAPI);
router.post("/getParagraphCount", TextAnalyzerController.getParagraphCountAPI);
router.post("/getLongestWordsInParagraphs", TextAnalyzerController.getLongestWordsInParagraphsAPI);

module.exports = router;
