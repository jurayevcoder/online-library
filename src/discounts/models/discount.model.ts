import { Column, DataType, Model, Table } from "sequelize-typescript";

interface DiscountAttr {
    name: string;
    number_percentage: number;
    start_date: Date;
    finish_date: Date;
}

@Table({tableName: "discount"})
export class Discount extends Model<Discount, DiscountAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type:DataType.INTEGER
    })
    number_percentage: number;

    @Column({
        type:DataType.DATE
    })
    start_date: Date;

    @Column({
        type:DataType.DATE
    })
    finish_date: Date;
}
