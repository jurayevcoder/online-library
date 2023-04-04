import { Column, DataType, Model, Table } from "sequelize-typescript";

interface StatisticaAttr {
    total_number_of_user: number;
    number_subscribed_user: number;
    unsubscribed_user_number: number;
    total_number_of_books: number;
    total_number_of_ads: number;
}

@Table({tableName: "statistica"})
export class Statistica extends Model<Statistica, StatisticaAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type:DataType.INTEGER,
        defaultValue: 0
    })
    total_number_of_user: number

    @Column({
        type:DataType.INTEGER,
        defaultValue: 0
    })
    number_subscribed_user: number

    @Column({
        type:DataType.INTEGER,
        defaultValue: 0
    })
    unsubscribed_user_number: number

    @Column({
        type:DataType.INTEGER,
        defaultValue: 0
    })
    total_number_of_books: number

    @Column({
        type:DataType.INTEGER,
        defaultValue: 0
    })
    total_number_of_ads: number
}
