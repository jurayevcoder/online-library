import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule);
        const PORT = process.env.PORT || 9999;

        app.use(cookieParser());    
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new ValidationPipe());

        const config = new DocumentBuilder()
            .setTitle('My Ticket')
            .setDescription('Rest API')
            .setVersion('1.0.0')
            .addTag('NodeJs, NestJs, Postgres, Sequalize')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);

        app.listen(PORT, () => {
            console.log(`Server ${PORT} -- portda ishga tushdi`);

        });
    } catch (err) {
        console.log(err);
    }
}

start();