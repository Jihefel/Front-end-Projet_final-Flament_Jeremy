import fs from "fs";
import path from "path";

export default function handler(request, response) {

  if (request.method === "GET") {
    const filePath = path.join(process.cwd(), "src", "data", "comptes.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    response.status(200).json(data);

  } else if (request.method === "PUT") {
    const email = request.body.email;
    const password = request.body.password;
    const isConnected = request.body.isConnected
    const favorites = request.body.favorites
    const message = request.body.message

    console.log(message)

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
    };
    console.log(accountUpdated.isConnected)
    console.log(isConnected)
    console.log(accountUpdated.favorites)
    console.log(favorites)
    if (isConnected === accountUpdated.isConnected && accountUpdated.favorites !== favorites) {
      console.log("ok1")
      const favIndexToChange = accountUpdated.favorites.findIndex(favoris => favoris.favdata.nom === favorites[favorites.length - 1].favdata.nom)
      if (favIndexToChange === -1) {
        console.log('ok add fav')
        accountUpdated.favorites = favorites;
      } else {
        console.log("no ok")
        accountUpdated.favorites.splice(favIndexToChange, 1)
      }
    }

    if (isConnected !== accountUpdated.isConnected) {
      accountUpdated.isConnected = isConnected;
    } else {
      accountUpdated.isConnected = isConnected;
    }
    
    data[accountIndex] = accountUpdated;
    fs.writeFileSync(filePath, JSON.stringify(data));
    response.status(200).json({ message: "Account updated" });
}
 else if (request.method === "POST") {

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
        messages: [],
        favorites: []
      };

      data.push(newAccount);
      fs.writeFileSync(filePath, JSON.stringify(data));


      response.status(200).json({ message: "success" });
    }

  } 
}
