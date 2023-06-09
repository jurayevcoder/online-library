import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';
import { BookImagesModule } from './book_images/book_images.module';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';
import { BookPaymentsModule } from './book_payments/book_payments.module';
import { DiscountsModule } from './discounts/discounts.module';
import { MonthlySubscriptionsModule } from './monthly_subscriptions/monthly_subscriptions.module';
import { PaymentMethodsModule } from './payment_methods/payment_methods.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { DislikesModule } from './dislikes/dislikes.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { AdminsModule } from './admins/admins.module';
import { OtpModule } from './otp/otp.module';
import { User } from './users/models/user.model';
import { Otp } from './otp/models/otp.model';
import { PaymentMethod } from './payment_methods/models/payment_method.model';
import { MonthlySubscription } from './monthly_subscriptions/models/monthly_subscription.model';
import { Like } from './likes/models/like.model';
import { Dislike } from './dislikes/models/dislike.model';
import { Discount } from './discounts/models/discount.model';
import { Comment } from './comments/models/comment.model';
import { Book } from './books/models/book.model';
import { BookPayment } from './book_payments/models/book_payment.model';
import { BookImage } from './book_images/models/book_image.model';
import { Author } from './authors/models/author.model';
import { Advertisement } from './advertisements/models/advertisement.model';
import { Admin } from './admins/models/admin.model';
import { StatisticaModule } from './statistica/statistica.module';
import { Statistica } from './statistica/models/statistica.model';
import { SuperadminModule } from './superadmin/superadmin.module';
import { Superadmin } from './superadmin/models/superadmin.model';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Otp, PaymentMethod, MonthlySubscription, Like, Dislike, Discount, Comment, Book, BookPayment, BookImage, Author, Advertisement, Admin, Statistica, Superadmin],
      autoLoadModels: true,
      logging: false,
    }),
    BooksModule,
    BookImagesModule,
    AuthorsModule,
    UsersModule,
    BookPaymentsModule,
    DiscountsModule,
    MonthlySubscriptionsModule,
    PaymentMethodsModule,
    AdvertisementsModule,
    DislikesModule,
    LikesModule,
    CommentsModule,
    AdminsModule,
    OtpModule,
    StatisticaModule,
    SuperadminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
