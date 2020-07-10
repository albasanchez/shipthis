//const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");

const languages = ["EN", "ES"];

function readEnvironmentVariables() {
 /* const envFilePath = __dirname + "/../../.env";
  const existsPath = fs.existsSync(envFilePath);
  if (!existsPath) {
    console.log(".env file does not exist");
    process.exit(0);
  }
  console.log("Reading environment variable VUE_APP_LANG_URL from .env file");*/
  console.log("Reading environment variable VUE_APP_LANG_URL from .env file");
  return process.env.VUE_APP_LANG_URL;
 // return dotenv.parse(fs.readFileSync(envFilePath)).VUE_APP_LANG_URL;
}

async function loadDictionary() {
  const language_url = readEnvironmentVariables();
  var promises = languages.map(async (lang) => {
    return await axios
      .post(`${language_url}/internationalization/get-dictionary`, {
        language: lang,
      })
      .then((terms) => {
        return new Promise((resolve, reject) => {
          fs.writeFile(
            __dirname + `/${lang}.json`,
            JSON.stringify(terms.data),
            (error) => {
              if (error) {
                console.log(`Error creating/writing file: ${lang}.json`);
                reject();
              } else {
                console.log(`Created: ${lang}.json`);
                resolve();
              }
            }
          );
        });
      })
      .catch(() => {
        console.log(`Error writing file: ${lang}.json`);
      });
  });
  await Promise.all(promises);
  process.exit(0);
}

loadDictionary();
