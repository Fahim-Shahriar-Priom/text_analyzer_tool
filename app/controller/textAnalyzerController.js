const getWordCountAPI = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const wordCount = getWordCount(text);
        return res.status(200).json({ wordCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getCharacterCountAPI = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const characterCount = getCharacterCount(text);
        return res.status(200).json({ characterCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getSentenceCountAPI = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const sentenceCount = getSentenceCount(text);
        return res.status(200).json({ sentenceCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getParagraphCountAPI = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const paragraphCount = getParagraphCount(text);
        return res.status(200).json({ paragraphCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getLongestWordsInParagraphsAPI = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const longestWords = getLongestWordsInParagraphs(text);
        return res.status(200).json({ longestWords });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Utility Functions
const getWordCount = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
};

const getCharacterCount = (text) => {
    return text.replace(/\s+/g, "").length;
};

const getSentenceCount = (text) => {
    return text.split(/[.!?]+(?=\s|$)/).filter(Boolean).length;
};

const getParagraphCount = (text) => {
    return text.split(/\n+/).filter(Boolean).length;
};

const getLongestWordsInParagraphs = (text) => {
    const paragraphs = text.split(/\n+/).filter(Boolean);
    const longestWords = paragraphs.map(paragraph => {
        const words = paragraph.split(/\s+/).filter(Boolean);
        let maxLength = 0;
        let longestInParagraph = [];

        words.forEach(word => {
            if (word.length > maxLength) {
                maxLength = word.length;
                longestInParagraph = [word];
            } else if (word.length === maxLength) {
                longestInParagraph.push(word);
            }
        });

        return longestInParagraph;
    });

    return longestWords.flat();
};

// Export API handlers
module.exports = {
    getWordCountAPI,
    getCharacterCountAPI,
    getSentenceCountAPI,
    getParagraphCountAPI,
    getLongestWordsInParagraphsAPI
};
