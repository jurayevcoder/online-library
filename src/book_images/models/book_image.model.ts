import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../../books/models/book.model";

interface BookImageAttr {
    book_id: number;
    url: string;
}

@Table({tableName: "book_image"})
export class BookImage extends Model<BookImage, BookImageAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    book_id: number;
    @BelongsTo(() => Book)
    book: Book

    @Column({
        type: DataType.STRING
    })
    url: string;
}
