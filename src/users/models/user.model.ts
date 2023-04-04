import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { BookPayment } from "../../book_payments/models/book_payment.model";
import { Comment } from "../../comments/models/comment.model";
import { MonthlySubscription } from "../../monthly_subscriptions/models/monthly_subscription.model";
import { Like } from "../../likes/models/like.model";
import { Dislike } from "../../dislikes/models/dislike.model";

interface UserAttr {
    full_name: string;
    email: string;
    phone: string;
    hashed_password: string
    birthday: Date;
}

@Table({tableName: "users"})
export class User extends Model<User, UserAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type: DataType.DATE,
    })
    birthday: Date;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @HasMany(() => Comment)
    comment: Comment;

    @HasMany(() => BookPayment)
    book_payment: BookPayment;

    @HasMany(() => MonthlySubscription)
    monthly_subscription: MonthlySubscription;

    @HasMany(() => Like)
    like: Like

    @HasMany(() => Dislike)
    dislike: Dislike
}

