const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const fs = require("fs").promises; // Usando a versão com promises
const { v4: uuidv4 } = require('uuid'); // uuid-v4 está depreciado
const { Storage } = require("@google-cloud/storage");

// Configuração simplificada do Storage - no Cloud Functions as credenciais são automáticas
const storage = new Storage({
  projectId: "lambe-e5f0c",
  keyFilename: "lambe-e5f0c-firebase.json",
});

exports.uploadImage = onRequest(async (request, response) => {
  // Verificação do favicon.ico antes do CORS
  if (request.path === "/favicon.ico") {
    return response.status(204).end();
  }

  return cors(request, response, async () => {
    console.log("Payload recebido:", request.body);
    try {
      // Validação mais robusta da imagem
      if (!request.body?.image || !request.body.image.match(/^data:image\/[a-z]+;base64,/)) {
        return response.status(400).json({ 
          error: "Imagem em formato base64 inválida ou não fornecida",
          details: "Esperado: data:image/<tipo>;base64,<dados>"
        });
      }

      // Extrai apenas os dados base64
      const base64Data = request.body.image.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, "base64");
      
      // Cria um nome de arquivo temporário único
      const tempFilePath = `/tmp/${uuidv4()}.jpg`;

      try {
        // Escreve o arquivo temporário (usando promises)
        await fs.writeFile(tempFilePath, imageBuffer);

        const bucket = storage.bucket("lambe-e5f0c.firebasestorage.app"); // Nome correto do bucket
        const id = uuidv4();
        const file = bucket.file(`posts/${id}.jpg`);

        // Faz o upload com metadados corretos
        await file.save(imageBuffer, {
          metadata: {
            contentType: 'image/jpeg',
            metadata: {
              firebaseStorageDownloadTokens: id,
            },
          },
        });

        // Gera a URL de acesso público (com encodeURIComponent)
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${id}`;

        // Remove o arquivo temporário após o upload
        await fs.unlink(tempFilePath);

        return response.status(201).json({ imageUrl });

      } catch (uploadError) {
        // Remove o arquivo temporário em caso de erro
        if (await fs.access(tempFilePath).then(() => true).catch(() => false)) {
          await fs.unlink(tempFilePath).catch(() => {});
        }
        throw uploadError;
      }

    } catch (error) {
      console.error("Erro no upload:", error);
      return response.status(500).json({ 
        error: "Falha ao processar a imagem",
        details: error.message 
      });
    }
  });
});