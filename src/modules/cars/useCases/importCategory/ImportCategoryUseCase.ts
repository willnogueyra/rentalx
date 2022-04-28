import fs from "fs";
import { parse as csvParse } from "csv-parse"
import { ICategoriesRepository } from "../../repositories/ICategoriesService";

interface IImportCategory {
  name: string;
  description: string;
}

/* Estamos recebendo arquivo do Controller, 
  createReadStream criando em uma stream de leitura passando caminho (file.path), 
  pipe vai pegar pedaço por pedaço e passar para parseFile para ler linha por linha
*/

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        const [name, description] = line;

        categories.push({
          name,
          description,
        })
      }).on("end", () => {
        resolve(categories);
      }).on("error", (err) =>{
        reject(err)
      })
      
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    console.log(categories);
  }

}

export { ImportCategoryUseCase }