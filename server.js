const express = require("express");
const PptxGenJS = require("pptxgenjs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Salesforce MCP Server Running");
});

app.get("/mcp", (req, res) => {
    res.json({
        tools: [
            {
                name: "generate_ppt",
                description: "Generate a PowerPoint presentation"
            }
        ]
    });
});

app.post("/generate_ppt", async (req, res) => {

    try {

        const title = req.body.title || "Generated Presentation";
        const content = req.body.content || "No content provided";

        let pptx = new PptxGenJS();

        let slide = pptx.addSlide();

        slide.addText(title, {
            x: 1,
            y: 1,
            w: 6,
            h: 1,
            fontSize: 24,
            bold: true
        });

        slide.addText(content, {
            x: 1,
            y: 2,
            w: 8,
            h: 3,
            fontSize: 14
        });

        const fileName = "presentation.pptx";

        await pptx.writeFile({
            fileName
        });

        res.json({
            status: "success",
            message: "PPT generated"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
