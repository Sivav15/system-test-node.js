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

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" }); // read the excel file
    const sheetName = workbook.SheetNames[0]; // Sheet1
    const sheet = workbook.Sheets[sheetName]; // select the particular sheet
    const jsonData = xlsx.utils.sheet_to_json(sheet); // [ { Message: 'siva', Sender: 19 }, { Message: 'ram', Sender: 40 } ]

    const chats = jsonData.map((row: any) => {
      return {
        message: row["Message"],
        sender: row["Sender"],
      };
    });

    const data:ChatModel[] = await ChatModel.bulkCreate(chats);

    return res.status(201).json({ message: "Chats imported successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to process the uploaded file" });
  }
};

module.exports =  chatImport;
