const request = require("supertest");
const app = require("../server");
const { getTextModel,insertTextModel,deleteTextModel, updateTextModel } = require("../app/model/textModel");

jest.mock("../app/model/textModel", () => ({
    insertTextModel: jest.fn(),
    deleteTextModel: jest.fn(),
    updateTextModel: jest.fn(),
    getTextModel: jest.fn(),
}));

describe("Text API Tests", () => {
    let server;

    beforeAll(() => {
        server = app.listen(4000);
    });

    afterAll((done) => {
        server.close(done);
    });

    test("Insert Text - Success", async () => {
        insertTextModel.mockResolvedValue({ insertId: 1 });

        const res = await request(app)
            .post("/api/insertText")
            .send({ text: "Test Text" });

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(1000);
        expect(res.body.message).toBe("Text inserted successfully");
    });

    test("Insert Text - Missing Text Field", async () => {
        const res = await request(app).post("/api/insertText").send({});

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(4000);
        expect(res.body.error).toBe("Text field is required");
    });

    test("Delete Text - Success", async () => {
        deleteTextModel.mockResolvedValue({ affectedRows: 1 });

        const res = await request(app).delete("/api/deleteText/1");

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(1000);
        expect(res.body.message).toBe("Text deleted successfully");
    });

    test("Update Text - Success", async () => {
        updateTextModel.mockResolvedValue({ affectedRows: 1 });

        const res = await request(app)
            .put("/api/updateText/1")
            .send({ text: "Updated Text" });

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(1000);
        expect(res.body.message).toBe("Text updated successfully");
    });

    test("Update Text - Missing Text Field", async () => {
        const res = await request(app).put("/api/updateText/1").send({});

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(4000);
        expect(res.body.error).toBe("Text field is required");
    });

    // **Test case for getText**:
    test("Get Text - Success", async () => {
        const textId = 1;
        const mockTextInfo = { text: "Test Text", id: textId };

        // Mocking getTextModel to return mockTextInfo
        getTextModel.mockResolvedValue(mockTextInfo);

        const res = await request(app).get(`/api/getText/${textId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(1000);
        expect(res.body.textInformation).toEqual(mockTextInfo);
    });

    test("Get Text - Error (Text Not Found)", async () => {
        const textId = 1;

        // Mocking getTextModel to throw an error (e.g., text not found)
        getTextModel.mockRejectedValue(new Error("Text not found"));

        const res = await request(app).get(`/api/getText/${textId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.tl_status).toBe(4000);
        expect(res.body.error).toBeDefined(); // Error should be present in the response
    });
});

