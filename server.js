const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("MCP Server Running");
});

app.get("/mcp", (req, res) => {
    res.json({
        name: "Salesforce PPT MCP",
        status: "active",
        tools: [
            {
                name: "generate_ppt",
                description: "Generate PowerPoint presentation"
            }
        ]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
