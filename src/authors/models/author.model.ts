import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AuthorAttr {
    full_name: string;
    image_path: string;
    about: string;
}

@Table({tableName: "author"})
export class Author extends Model<Author, AuthorAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    full_name: string

    @Column({
        type: DataType.STRING
    })
    image_path: string

    @Column({
        type: DataType.STRING
    })
    about: string
}
