const express = require("express");
const router = express.Router();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON); // sua service account

async function salvarLead(nome, wpp) {
    try {
        // Autenticação via JWT — v5 exige isso
        const auth = new JWT({
            email: creds.client_email,
            key: creds.private_key,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        // Instancia planilha com auth direto
        const doc = new GoogleSpreadsheet(
            "1txwjyQyld0j5r5WAnFl0OLG1r7JpIHHll81IrUFhVmk",
            auth
        );

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({
            Nome: nome,
            WhatsApp: wpp,
            DataHora: new Date().toLocaleString("pt-BR"),
        });

        console.log("Lead salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar lead:", error);
        throw error;
    }
}

// Rota principal
router.post("/", async (req, res) => {
    const { nome, wpp } = req.body;

    if (!nome || !wpp) {
        return res.status(400).json({ error: "Nome e WhatsApp são obrigatórios!" });
    }

    try {
        await salvarLead(nome, wpp);
        res.json({ message: "Lead salvo com sucesso!" });
    } catch {
        res.status(500).json({ error: "Erro ao salvar lead no Google Sheets" });
    }
});

module.exports = router;
