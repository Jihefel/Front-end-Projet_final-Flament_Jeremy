import fs from "fs";
import path from "path";
const bcrypt = require("bcrypt");

// Fonction pour vérifier l'authentification
function authenticateUser(email, password, data) {
  // Récupère l'objet de compte correspondant à l'e-mail
  const userAccount = data.find((account) => account.email === email);

  if (userAccount) {
    // Compare le mot de passe fourni avec le mot de passe haché stocké dans l'objet de compte
    return bcrypt.compareSync(password, userAccount.password);
  } else {
    // L'e-mail n'est pas associé à un compte existant
    return false;
  }
}

export default function handler(request, response) {
  if (request.method === "GET") {
    const filePath = path.join(process.cwd(), "src", "data", "comptes.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    response.status(200).json(data);
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
      response.status(409).json({ message: "Un compte existe déjà pour cet e-mail." });
    } else {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds); // hache le mot de passe

      const newAccount = {
        prenom: prenom,
        nom: nom,
        email: email,
        password: hash,// Stocke le mot de passe haché
        isConnected: false,
        message: {} 
      };

      data.push(newAccount);
      fs.writeFileSync(filePath, JSON.stringify(data));

      // Vérifie l'authentification
      const isAuthenticated = authenticateUser(email, password, data);

      if (isAuthenticated) {
        // L'authentification est réussie
        response.status(200).json({ message: "success" });
      } else {
        // L'authentification a échoué
        response.status(401).json({ message: "Unauthorized" });
      }
    }
  }
}
