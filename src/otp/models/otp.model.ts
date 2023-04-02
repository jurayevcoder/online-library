import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface OtpAttr {
    id: string;
    phone: string;
    sms_code: string
    verified: boolean;
    expiration_time: Date;
}

@Table({tableName: 'otp'})
export class Otp extends Model<Otp, OtpAttr> {
    @ApiProperty({example: '1123943-sda9-asdad-vcx4', description: 'OTP ID'})
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ApiProperty({example: '998901234567', description: 'check phone number'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @ApiProperty({example: '1234', description: 'OTP'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sms_code: string;

    @ApiProperty({example: 'false', description: 'verified'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    verified: boolean;

    @ApiProperty({example: '2023-03-17 16:12:45.167+05 ', description: 'expiration time'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expiration_time: Date;
}