import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../../books/models/book.model";
import { User } from "../../users/models/user.model";

interface CommentAttr {
    user_id: number;
    book_id: number;
    comment: string;
}


@Table({tableName: "comments"})
export class Comment extends Model<Comment, CommentAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;
    @BelongsTo(() => User)
    user: User

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
    comment: string;
}
