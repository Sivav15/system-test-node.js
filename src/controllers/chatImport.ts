import { Request, Response } from "express";
import xlsx from "xlsx";
import ChatModel from "../models/ChatModel";

interface CustomRequest extends Request {
  file?: Express.Multer.File; 
}

const chatImport = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
   
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const chats = jsonData.map((row: any) => {
      return {
        message: row["Message"],
        sender: row["Sender"],
      };
    });

    const data = await ChatModel.bulkCreate(chats);

    return res.json({ message: "Chats imported successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to process the uploaded file" });
  }
};

module.exports =  chatImport;
