import * as fs from 'fs';

interface IMergeFiles {
    MergeSchemas(directory: string): string
}

class Merge implements IMergeFiles {
    public files: Array<string>

    private ReadFiles(directory: string): void {
      try {
        this.files = fs.readdirSync(directory).filter((e) => e.match(/.gql/gi));
      } catch (error) {
        throw new Error(error);
      }
    }

    public MergeSchemas(directory: string): string {
      try {
        this.ReadFiles(directory);

        return (this.files.map((e) => fs.readFileSync(`${directory}/${e}`, 'utf-8')))
          .reduce((a, b) => a + b);
      } catch (error) {
        throw new Error(error);
      }
    }
}

export default new Merge();
