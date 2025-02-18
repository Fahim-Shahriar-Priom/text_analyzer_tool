const request = require("supertest");
const app = require("../server");

describe("Text Analysis API Tests", () => {
    let server;

    beforeAll(() => {
        server = app.listen(4000);
    });

    afterAll((done) => {
        server.close(done);
    });

    test("Word Count API - Success", async () => {
        const text = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

        const res = await request(app)
            .post("/api/getWordCount")
            .send({ text });

        expect(res.statusCode).toBe(200);
        expect(res.body.wordCount).toBe(16);
    });

    test("Character Count API - Success", async () => {
        const text = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

        const res = await request(app)
            .post("/api/getCharacterCount")
            .send({ text });

        expect(res.statusCode).toBe(200);
        expect(res.body.characterCount).toBe(60); // 60 with spaces, 52 without spaces
    });

    test("Sentence Count API - Success", async () => {
        const text = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

        const res = await request(app)
            .post("/api/getSentenceCount")
            .send({ text });

        expect(res.statusCode).toBe(200);
        expect(res.body.sentenceCount).toBe(2);
    });

    test("Paragraph Count API - Success", async () => {
        const text = "The quick brown fox jumps over the lazy dog.\nThe lazy dog slept in the sun.";

        const res = await request(app)
            .post("/api/getParagraphCount")
            .send({ text });

        expect(res.statusCode).toBe(200);
        expect(res.body.paragraphCount).toBe(2);
    });

    test("Longest Words in Paragraphs API - Success", async () => {
        const text = "The quick brown fox jumps over the lazy dog.\nThe lazy dog slept in the sun.";

        const res = await request(app)
            .post("/api/getLongestWordsInParagraphs")
            .send({ text });

        expect(res.statusCode).toBe(200);
        expect(res.body.longestWords.sort()).toEqual(["quick", "brown", "jumps", "slept"].sort());
    });

    test("Missing Text Field - Error (Word Count API)", async () => {
        const res = await request(app).post("/api/getWordCount").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text field is required");
    });

    test("Missing Text Field - Error (Character Count API)", async () => {
        const res = await request(app).post("/api/getCharacterCount").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text field is required");
    });

    test("Missing Text Field - Error (Sentence Count API)", async () => {
        const res = await request(app).post("/api/getSentenceCount").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text field is required");
    });

    test("Missing Text Field - Error (Paragraph Count API)", async () => {
        const res = await request(app).post("/api/getParagraphCount").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text field is required");
    });

    test("Missing Text Field - Error (Longest Words API)", async () => {
        const res = await request(app).post("/api/getLongestWordsInParagraphs").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text field is required");
    });
});
