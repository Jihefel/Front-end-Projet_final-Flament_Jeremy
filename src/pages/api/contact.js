import fs from "fs";
import path from "path";

export default function handler(request, response) {
    
  if (request.method === "GET") {
    const filePath = path.join(process.cwd(), "src", "data", "contacts.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    response.status(200).json(data);

  } else if (request.method === "POST") {

    const newEmail = request.body.email;
    const newPassword = request.body.password;

    const newAccount = { name: newName, phone: newPhone, email: newEmail };

    const filePath = path.join(process.cwd(), "src", "data", "contacts.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    data.push(newContact)
    fs.writeFileSync(filePath, JSON.stringify(data))

    response.status(201).json({message: "success"})
    
  }
}