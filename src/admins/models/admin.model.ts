import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminAttr {
    full_name: string;
    email: string;
    phone: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: string;
}

@Table({tableName: "admin"})
export class Admin extends Model<Admin, AdminAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    role: string;
}
