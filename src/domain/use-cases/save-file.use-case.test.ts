import {SaveFile} from "./save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
    const customOptions = {
        fileContent: "custom content",
        fileDestination: "custom-outputs/file-destination ",
        fileName: "custom-table-name"
    };

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    //Antes de cada prueba
    beforeEach(() => {
        //clean up
        //Antes de cada prueba se borra la carpeta outputs
        const customOutputFolderExists = fs.existsSync("outputs");
        if (customOutputFolderExists) {
            fs.rmSync("outputs", {recursive: true});
        }
    });

    //Luego de cada prueba
    afterEach(() => {
        //    fs.rmSync("outputs", {recursive: true});
    });

    test("should save file with default values", () => {
        const saveFile = new SaveFile();
        const filePath = "outputs/table.txt";

        const options = {
            fileContent: "test content"
        };

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: "utf-8"});

        expect(result).toBeTruthy();
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test("should save file with custom values", () => {
        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);

        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, {
            encoding: "utf-8"
        });

        expect(result).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
        expect(fileExists).toBe(true);
    });

    test("should return false if the directory could not be created", () => {
        const saveFile = new SaveFile();
        //Va a estar espiando el método mkdirSync del módulo fs
        //Lo que se está haciendo aquí es obligando que el método lance una excepción
        //para probar el try/catch del método execute
        const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
            throw new Error("This is a custom error message from testing");
        });

        const result = saveFile.execute(customOptions);
        expect(result).toBe(false);

        //Para que los siguientes test no den error, se deben restaurar todos los mock
        mkdirSpy.mockRestore();
    });

    test("should return false if file could not be created", () => {
        const saveFile = new SaveFile();
        //Va a estar espiando el método write del módulo fs
        const writeFileSpy = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation(() => {
                throw new Error("This is a custom writing error message");
            });

        const result = saveFile.execute({fileContent: "Hello"});
        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });
});
