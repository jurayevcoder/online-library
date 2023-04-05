import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SuperAdminAttr {
    full_name: string;
    email: string;
    phone: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: string;
}

@Table({tableName: "superadmin"})
export class Superadmin extends Model<Superadmin, SuperAdminAttr> {
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
