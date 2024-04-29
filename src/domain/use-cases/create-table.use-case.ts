export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {
    constructor(/**
     * DI - Dependency Injection
     */) {}

    execute({base, limit = 10}: CreateTableOptions) {
        let content = "";
        for (let index = 1; index <= limit; index++) {
            content += `${base} x ${index} = ${Number(base) * index}`;
            if (index < limit) {
                content += "\n";
            }
        }

        return content;
    }
}
