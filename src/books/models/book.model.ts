import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/models/author.model";
import { BookImage } from "../../book_images/models/book_image.model";
import { BookPayment } from "../../book_payments/models/book_payment.model";
import { Comment } from "../../comments/models/comment.model";
import { Dislike } from "../../dislikes/models/dislike.model";
import { Like } from "../../likes/models/like.model";

interface BookAttr {
    name: string;
    book_type: string;
    language: string;
    created_at: string;
    author_id: number;
    description: string;
    e_book: boolean;
}

@Table({tableName: "books"})
export class Book extends Model<Book, BookAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    book_type: string;

    @Column({
        type: DataType.STRING
    })
    language: string;

    @Column({
        type: DataType.STRING
    })
    created_at: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER
    })
    author_id: number;
    @BelongsTo(() => Author)
    author: Author

    @Column({
        type: DataType.STRING
    })
    description: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    e_book: boolean;

    @HasMany(() => Like)
    like: Like

    @HasMany(() => Dislike)
    dislike: Dislike

    @HasMany(() => Comment)
    comment: Comment

    @HasMany(() => BookPayment)
    book_payment: BookPayment

    @HasMany(() => BookImage)
    book_image: BookImage

    
}
