import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Advertisement } from "../../advertisements/models/advertisement.model";
import { MonthlySubscription } from "../../monthly_subscriptions/models/monthly_subscription.model";

interface PaymentMethodAttr {
    name: string;
}

@Table({tableName: 'payment_method'})
export class PaymentMethod extends Model<PaymentMethod, PaymentMethodAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @HasMany(() => MonthlySubscription)
    monthly_subscription: MonthlySubscription;

    @HasMany(() => Advertisement)
    advertisement: Advertisement;
}