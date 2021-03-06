import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://ulvimemmedov:0519770884@ulvimemmedov.1rkuq.mongodb.net/testsNest?retryWrites=true&w=majority',{
          useNewUrlParser:true
      }),
      BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
