import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../../books/models/book.model";

interface LikeAttr {
    user_id: number;
    book_id: number;
    like_number: number;
}

@Table({ tableName: "like" })
export class Like extends Model<Like, LikeAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.INTEGER
    })
    user_id: number;

    @ForeignKey(() => Book)
    @Column({
        type: DataType.INTEGER
    })
    book_id: number;
    @BelongsTo(() => Book)
    book: Book

    @Column({
        type: DataType.INTEGER
    })
    like_number: number;
}
