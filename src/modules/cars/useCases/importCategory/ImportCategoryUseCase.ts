import fs from "fs";
import { parse as csvParse } from "csv-parse"

/* Estamos recebendo arquivo do Controller, 
  createReadStream criando em uma stream de leitura passando caminho (file.path), 
  pipe vai pegar pedaço por pedaço e passar para parseFile para ler linha por linha
*/

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile)

    parseFile.on("data", async (line) => {
      console.log(line);
    })
  }

}

export {ImportCategoryUseCase}