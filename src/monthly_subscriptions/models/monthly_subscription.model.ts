import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from 'src/users/models/user.model';
import { Discount } from "../../discounts/models/discount.model";
import { PaymentMethod } from "../../payment_methods/models/payment_method.model";

interface MonthlySubscriptionAttr {
    user_id: number;
    price: number;
    discounts_id: number;
    payment_method_id: number;
}


@Table({ tableName: "monthly_subscription" })
export class MonthlySubscription extends Model<MonthlySubscription, MonthlySubscriptionAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;
    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.INTEGER,
    })
    price: number;

    @ForeignKey(() => Discount)
    @Column({
        type: DataType.INTEGER,
    })
    discount_id: number;
    @BelongsTo(() => Discount)
    discount: Discount;

    @ForeignKey(() => PaymentMethod)
    @Column({
        type: DataType.INTEGER,
    })
    payment_method_id: number;
    @BelongsTo(() => PaymentMethod)
    payment_method: PaymentMethod;
}
