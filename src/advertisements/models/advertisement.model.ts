import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PaymentMethod } from "../../payment_methods/models/payment_method.model";

interface AdvertisementAttr {
    product_name: string;
    start_date: Date;
    finish_date: Date;
    price: number;
    payment_method_id: number;
}

@Table({tableName: "advertisement"})
export class Advertisement extends Model<Advertisement, AdvertisementAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    product_name: string;

    @Column({
        type: DataType.DATE
    })
    start_date: Date;

    @Column({
        type: DataType.DATE
    })
    finish_date: Date;

    @Column({
        type: DataType.INTEGER
    })
    price: number;

    @ForeignKey(() => PaymentMethod)
    @Column({
        type: DataType.INTEGER
    })
    payment_method_id: number;
    @BelongsTo(() => PaymentMethod)
    payment_method: PaymentMethod;
}
