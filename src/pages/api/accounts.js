import fs from "fs";
import path from "path";

export default function handler(request, response) {

  if (request.method === "GET") {
    const filePath = path.join(process.cwd(), "src", "data", "comptes.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    response.status(200).json(data);

  } else if (request.method === "PUT") {
    console.log(request.body)
    const email = request.body.email;
    const password = request.body.password;
  
    console.log(email, password);
  
    const filePath = path.join(process.cwd(), "src", "data", "comptes.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
  
    const accountIndex = data.findIndex(
      (account) => account.email === email && account.password === password
    );
  
    if (accountIndex === -1) {
      response.status(404).json({ message: "Account not found" });
      return;
    }
  
    const accountUpdated = {
      ...data[accountIndex],
      isConnected: !request.body.isConnected,
    };
    console.log(accountUpdated)
    data[accountIndex] = accountUpdated;
    console.log(data);
    fs.writeFileSync(filePath, JSON.stringify(data));
    response.status(200).json({ message: "Account connected" });

  } else if (request.method === "POST") {

    const prenom = request.body.prenom;
    const nom = request.body.nom;
    const email = request.body.email;
    const password = request.body.password;

    const filePath = path.join(process.cwd(), "src", "data", "comptes.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    // Vérifie si un compte existe déjà pour l'email fourni
    const existingAccount = data.find((account) => account.email === email);

    if (existingAccount) {
      // Un compte existe déjà pour cet e-mail
      response
        .status(409)
        .json({ message: "Un compte existe déjà pour cet e-mail." });
    } else {
      const newAccount = {
        prenom: prenom,
        nom: nom,
        email: email,
        password: password, // Stocke le mot de passe haché
        isConnected: false,
        message: {},
        favorites: []
      };

      data.push(newAccount);
      fs.writeFileSync(filePath, JSON.stringify(data));


      response.status(200).json({ message: "success" });
    }

  } 
}
